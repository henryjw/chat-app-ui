/** @typedef { import('../../types').ChatMessage } ChatMessage  */

import React from "react"
import { navigate } from 'gatsby'
import { Button, FormLabel, Input, FormGroup, Container, List, ListItem } from '@material-ui/core'

import Layout from "../components/layout"
import SEO from "../components/seo"
import fakeMessages from "../utils/fakeMessages";


const ChatPage = () => {
    // TODO: Check if user is logged in before loading page
    return (
        <Layout>
            <SEO title="Chat" />
            <Container>
                <Chat messages={fakeMessages}/>
                <Container>
                    <Input/>
                    <Button>Send</Button>
                </Container>
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
