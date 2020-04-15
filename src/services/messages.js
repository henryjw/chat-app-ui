/** @typedef { import('../../types').ChatMessage } ChatMessage */

/**
 * @return {Promise<Array<ChatMessage>>}
 */
export async function getMessages() {
    return [
        {
            username: 'user1',
            message: "Hello, world!",
            time: new Date()
        },
        {
            username: 'user22',
            message: "Hi",
            time: new Date()
        }
    ]
}