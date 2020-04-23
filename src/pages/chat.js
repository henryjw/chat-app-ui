/** @typedef { import('../../types').ChatMessage } ChatMessage  */

import React, { useState, useEffect } from "react"
import { Button, Input, Container, List, ListItem } from '@material-ui/core'
import useWebSocket, { ReadyState } from 'react-use-websocket'


import Layout from "../components/layout"
import SEO from "../components/seo"
import { getMessages } from "../services/messages"


const ChatPage = () => {
    const [publishMessage, lastMessage, readyState, getWebSocket] = useWebSocket('ws://localhost:8080/ws')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const username = localStorage.getItem('username')

    // This should only be called when component is loaded
    // https://stackoverflow.com/a/53121021/6530609
    useEffect(() => {
        // TODO: show loader until messages are received
        getMessages()
            .then(setMessages)
            .catch(console.error)
    }, [])

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
            <Container>
                <Chat messages={messages} loggedInUsername={username} />
                <form onSubmit={e => { e.preventDefault(); sendMessage() }}>
                    <Input required value={message} onChange={e => setMessage(e.target.value)} />
                    <Button type="submit">Send</Button>
                </form>
            </Container>
        </Layout>
    )
}

/**
 * 
 * @param {object} props
 * @param {Array<ChatMessage>} props.messages
 * @param {string} props.loggedInUsername
 */
const Chat = (props) => {
    const { messages, loggedInUsername } = props

    console.log('Messages', messages)

    const messageListItems = messages.map(message => {
        const { username, createTime, message: messageValue } = message
        const usernameElement = username === loggedInUsername
            ? <b>Me</b>
            : username

        return (
            <ListItem key={`${username}:${createTime}`}>
                <span>{usernameElement}: {messageValue}</span>
            </ListItem>
        )
    })

    return <List>{messageListItems}</List>
}

export default ChatPage
