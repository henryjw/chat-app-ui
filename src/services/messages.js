/** @typedef { import('../../types').ChatMessage } ChatMessage */

import axios from 'axios'

/**
 * @return {Promise<Array<ChatMessage>>}
 */
export async function getMessages() {
    const { data } = await axios.get('http://localhost:8080/messages')

    const messages = data.items.map(item => ({
        username: item.username,
        message: item.message,
        createTime: new Date(item.createTime)
    }));

    return messages;
}