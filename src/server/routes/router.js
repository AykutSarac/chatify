const axios = require('axios')

const instance = axios.create({ baseURL: 'http://localhost:5000' })

module.exports = function (fastify, options, done) {

    // Get all channels the user is inside
    fastify.get('/channels', async (req, res) => {

        try {
            const { userId } = req.query;

            const data = await instance.get('/channels').then(res => res.data)
            const channelList = data.filter(ch => ch.users.includes(Number(userId)))

            res.status(200).send(channelList);
        } catch (err) {
            res.status(404).send(err)
            console.error(err.response)
        }
    });

    // Get all channels the user is inside
    fastify.get('/getChannel', async (req, res) => {

        try {
            const { channelId } = req.query;

            const data = await instance.get('/channels/' + Number(channelId)).then(res => res.data)

            res.status(200).send(data);
        } catch (err) {
            res.status(404).send(err)
            console.error(err.response)
        }
    });

    // Get channel users
    fastify.get('/channelUsers', async (req, res) => {

        try {
            const { channelId } = req.query;


            const sortByName = (a, b) => {
                if (a.username < b.username) { return -1; }
                if (a.username > b.username) { return 1; }
                return 0;
            }

            const data = await instance.get('/channels/' + channelId).then(res => res.data?.users)
            const userList = await Promise.all(data.map(async userId =>
                await instance.get('/users/' + userId).then(res => res.data)
            ))

            res.status(200).send(userList.sort(sortByName));
        } catch (err) {
            res.status(404).send(err)
            console.error(err.response)
        }

    });


    // Get all messages of the channel
    fastify.get('/messages', async (req, res) => {
        try {
            const { channelId } = req.query;

            const data = await instance.get('/messages').then(res => res.data)
            const messageList = await Promise.all(data.filter(msg => msg.channelId === Number(channelId)).map(async msg => {
                const user = await instance.get('/users/' + msg.userId).then(res => res.data)

                return {
                    ...msg,
                    username: user.username,
                    avatar: user?.avatar
                }
            }))

            res.status(200).send(messageList)
        } catch (err) {
            res.status(404).send(err)
            console.error(err.response)
        }
    });

    // Send a message to channel
    fastify.post('/messages', async (req, res) => {

        try {
            const { userId, channelId, message } = req.body

            const msgData = {
                channelId,
                message,
                userId
            }

            const data = await instance.post('/messages', JSON.stringify(msgData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            res.status(200).send(data.data)
        } catch (err) {
            console.error(err)
            res.status(404).send(err)
        }
    });


    // Add new channel
    fastify.post('/channels', async (req, res) => {

        try {

            const { name, userId } = req.body

            const chData = {
                name,
                users: [userId]
            }

            const data = await instance.post('/channels', JSON.stringify(chData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            res.status(200).send(data.data)
        } catch (err) {
            console.error(err)
            res.status(404).send(err)
        }
    })

    fastify.get('/users', async (req, res) => {
        try {
            const { userId } = req.query

            const data = await instance.get('/users/' + userId)
            res.status(200).send(data.data)

        } catch (err) {
            console.error(err)
            res.status(404).send(err)
        }
    })

    done()
}