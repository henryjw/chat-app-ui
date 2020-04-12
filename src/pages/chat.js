/** @typedef { import('../../types').ChatMessage } ChatMessage  */

import React, { useState } from "react"
import { Button, Input, Container, List, ListItem, FormGroup } from '@material-ui/core'

import Layout from "../components/layout"
import SEO from "../components/seo"
import fakeMessages from "../utils/fakeMessages";


const ChatPage = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState(fakeMessages)
    const username = localStorage.getItem('username')

    /**
     * 
     * @param {String} message
     * @returns {ChatMessage} 
     */
    const buildMessage = message => ({
        message,
        authorUsername: username,
        time: new Date()
    })

    const clearText = () => setMessage('')

    const sendMessage = () => {
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
        <ListItem key={`${message.authorUsername}:${message.time.getMilliseconds()}`}>
            <span>{message.authorUsername}: {message.message}</span>
        </ListItem>
    ))

    return <List>{messageListItems}</List>
}

export default ChatPage
