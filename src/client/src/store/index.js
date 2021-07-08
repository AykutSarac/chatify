import { reactive, toRefs } from 'vue'

const state = reactive({
    error: null,
    channels: [],
    channelUsers: [],
    currentUser: {},
    currentChannel: {},
    channelUsers: [],
    channelMessages: []
});

export default function() {
    const setUser = async (userId) => {
        try {
            const data = await fetch('http://127.0.0.1:8080/users?userId=' + userId)
            state.currentUser = await data.json();

            await getChannels(state.currentUser.id)





        } catch (err) {
            state.error = err
        }
    }

    const getMessages = async (channelId) => {
        try {
            const data = await fetch('http://127.0.0.1:8080/messages?channelId=' + channelId)
            state.channelMessages = await data.json();
        } catch (err) {
            state.error = err
        }
    }

    const getChannels = async (userId) => {
        try {
            const data = await fetch('http://127.0.0.1:8080/channels?userId=' + userId)
            state.channels = await data.json();
            if (!state.currentChannel?.id) {
                state.currentChannel = state.channels[0] || {}
                await getMessages(state.currentChannel?.id)
            } 
        } catch (err) {
            state.error = err
        }
    }

    const setChannel = async (channelId) => {
        try {
            const data = await fetch('http://127.0.0.1:8080/getChannel?channelId=' + channelId)
            state.currentChannel = await data.json()
            await getMessages(state.currentChannel.id)
        } catch (err) {
            state.error = err
        }
    }

    return {
        // States
        ...toRefs(state),

        // Actions
        getChannels,
        setChannel,
        getMessages,
        setUser
    }
}