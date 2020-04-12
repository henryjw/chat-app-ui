/** @typedef { import('../../types').ChatMessage } ChatMessage */

/**
 * @type {Array<ChatMessage>}
 */
const fakeMessages = [
    {
        authorUsername: 'user1',
        message: "Hello, world!",
        time: new Date()
    },
    {
        authorUsername: 'user22',
        message: "Hi",
        time: new Date()
    }
]

export default fakeMessages