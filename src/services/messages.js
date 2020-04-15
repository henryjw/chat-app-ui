/** @typedef { import('../../types').ChatMessage } ChatMessage */

import axios from 'axios'

/**
 * @return {Promise<Array<ChatMessage>>}
 */
export async function getMessages() {
    const { data } = await axios.get('http://localhost:3000/messages')

    const result = data.items.map(item => ({
        username: item.Username,
        message: item.Message,
        createTime: new Date(item.CreateTime)
    }));

    return result;
}