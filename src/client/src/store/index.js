"use strict"
import { reactive, toRefs } from 'vue'
import axios from 'axios'

const state = reactive({
    error: null,
    channels: [],
    currentUser: {},
    currentChannel: {},
    channelUsers: [],
    channelMessages: []
});

const instance = axios.create({
    baseURL: "http://localhost:8080"
})

export default function () {
    const setUser = async (userId) => {
        try {
            const data = await instance.get('/users?userId=' + userId).then(res => res.data)
            state.currentUser = data;

            sessionStorage.setItem('user', JSON.stringify(state.currentUser))
            await getChannels(state.currentUser.id)
        } catch (err) {
            state.error = err
        }
    }

    const setChannelUsers = async (channelId) => {
        try {
            const data = await instance.get('/channelUsers?channelId=' + channelId).then(res => res.data)
            state.channelUsers = data;
        } catch (err) {
            state.error = err
        }
    }

    const getMessages = async (channelId) => {
        try {
            const data = await instance.get('/messages?channelId=' + channelId).then(res => res.data)
            state.channelMessages = data;
        } catch (err) {
            state.error = err
        }
    }

    const getChannels = async (userId) => {
        try {
            const data = await instance.get('/channels?userId=' + userId).then(res => res.data)
            state.channels = data;
            if (!state.currentChannel?.id) setChannel(state.channels[0].id)
        } catch (err) {
            state.error = err
        }
    }

    const sendMessage = async (userId, channelId, message) => {
        try {

            await instance.post('/messages', {
                userId,
                channelId,
                message,
                date: new Date()
            }).then(res => res.data)

            await getMessages(channelId)
        } catch (err) {
            state.error = err
        }
    }

    const createChannel = async (userId, name) => {
        try {

            const data = await instance.post('/channels', {
                userId,
                name
            }).then(res => res.data)

            await getChannels(userId)
            await setChannel(data.id)
        } catch (err) {
            state.error = err
        }
    }

    const setChannel = async (channelId) => {
        try {
            const data = await instance.get('/getChannel?channelId=' + channelId).then(res => res.data)
            state.currentChannel = data

            await getMessages(state.currentChannel.id)
            await setChannelUsers(state.currentChannel.id)
        } catch (err) {
            state.error = err
        }
    }

    return {
        // States
        ...toRefs(state),

        // Actions
        getMessages,
        getChannels,
        setChannel,
        setChannelUsers,
        setUser,
        sendMessage,
        createChannel
    }
}