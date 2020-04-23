/** @typedef { import('../../types').ChatMessage } ChatMessage */

import axios from 'axios'

/**
 * @return {Promise<Array<ChatMessage>>}
 */
export async function getMessages() {
    const { data } = await axios.get('http://localhost:8080/messages')

    return data.items;
}