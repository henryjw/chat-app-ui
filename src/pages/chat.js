/** @typedef { import('../../types').ChatMessage } ChatMessage  */

import React, { useState, useEffect } from "react"
import { Button, Input, Container, List, ListItem } from '@material-ui/core'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { getMessages } from "../services/messages";


const ChatPage = () => {
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

    /**
     * 
     * @param {String} message
     * @returns {ChatMessage} 
     */
    const buildMessage = message => ({
        message,
        username,
        createTime: new Date()
    })

    const clearText = () => setMessage('')

    const sendMessage = () => {
        // TODO: call service instead of appending in memory
        setMessages(messages.concat([buildMessage(message)]));
        clearText();
        return false;
    }

    // TODO: Check if user is logged in before loading page
    return (
        <Layout>
            <SEO title="Chat" />
            <Container>
                <Chat messages={messages}/>
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
 */
const Chat = (props) => {
    const { messages } = props

    const messageListItems = messages.map(message => (
        <ListItem key={`${message.username}:${message.createTime.getMilliseconds()}`}>
            <span>{message.username}: {message.message}</span>
        </ListItem>
    ))

    return <List>{messageListItems}</List>
}

export default ChatPage
