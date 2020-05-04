/** @typedef { import('../../types').ChatMessage } ChatMessage  */

import React, { useState, useEffect } from "react"
import { Button, Input, Container, List, ListItem, Divider, TextField } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import useWebSocket, { ReadyState } from 'react-use-websocket'


import Layout from "../components/layout"
import SEO from "../components/seo"
import { getMessages } from "../services/messages"

import "../css/chat.css"


const ChatPage = () => {
    const [reconnecting, setReconnecting] = useState(false);
    const [publishMessage, lastMessage, readyState, getWebSocket] = useWebSocket('ws://localhost:8080/ws', {
        enforceStaticOptions: false,
        onClose: e => {
            setReconnecting(true)
            console.log("Websocket connection closed", e.target)
        },
        onOpen: e => {
            // TODO: fetch the messages from the backend after connecting
            setReconnecting(false);
            console.log("Websocket connection opened", e.target);
            getMessages()
                .then(setMessages)
                .catch(console.error)
        },
        onError: e => {
            setReconnecting(true);
            console.error("Websocket error", e.target)
        },
        shouldReconnect: e => true,
        reconnectAttempts: 20,
        reconnectInterval: 2000,
    })

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const username = localStorage.getItem('username')

    useEffect(() => {
        if (lastMessage !== null) {
            // getWebSocket returns the WebSocket wrapped in a Proxy.
            // This is to restrict actions like mutating a shared websocket, overwriting handlers, etc
            const currentWebsocketUrl = getWebSocket().url
            const messageData = JSON.parse(lastMessage.data)
            console.log('received a message from ', currentWebsocketUrl, typeof (messageData), messageData)

            addMessage(messageData)
        }
    }, [lastMessage])

    /**
     * 
     * @param {String} message
     * @returns {ChatMessage}
     */
    const buildMessage = message => ({
        message,
        username,
        createTime: Date.now()
    })

    const clearText = () => setMessage('')

    /**
     * 
     * @param {ChatMessage} message
     */
    const addMessage = message => setMessages(messages.concat([message]))

    const sendMessage = () => {
        const chatMessage = buildMessage(message)
        console.log('Publishing message', chatMessage)
        publishMessage(JSON.stringify(chatMessage))
        clearText()
    }

    // TODO: Check if user is logged in before loading page
    return (
        <Layout>
            <SEO title="Chat" />
            <div hidden={!reconnecting}>
                {/* Alert is wrapped in `div` because it doesn't expose the `hidden` prop */}
                <Alert severity="warning" >We're unable to connect to our servers. Reconnecting...</Alert>
            </div>
            <Container id="container">
                {/* FIXME: Prevent the entire component from re-rendering whenever the input changes. */}
                <Chat id="chatbox" messages={messages} loggedInUsername={username} />
                <form id="chatinput" onSubmit={e => { e.preventDefault(); sendMessage() }}>
                    <TextField required value={message} onChange={e => setMessage(e.target.value)} variant="outlined" multiline={false} disabled={reconnecting} />
                    <Button type="submit" disabled={reconnecting}>Send</Button>
                </form>
            </Container>
        </Layout>
    )
}

/**
 * 
 * @param {object} props
 * @param {string} props.id
 * @param {Array<ChatMessage>} props.messages
 * @param {string} props.loggedInUsername
 */
const Chat = (props) => {
    const { messages, loggedInUsername, id } = props

    console.log('Messages', messages)

    const messageListItems = messages.map((message, index) => {
        const { username, createTime, message: messageValue } = message
        const usernameElement = username === loggedInUsername
            ? <b>Me</b>
            : username

        const isLastItem = index === messages.length - 1

        return (
            <>
                <ListItem id="chatmessage" key={`${username}:${createTime}`}>
                    <span>{usernameElement}: {messageValue}</span>
                </ListItem>
                <Divider light hidden={isLastItem} />
            </>
        )
    })

    return (
        <div id={id}>
            <List>{messageListItems}</List>
        </div>
    )
}

export default ChatPage
