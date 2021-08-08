const axios = require('axios');
const instance = axios.create({ baseURL: 'http://localhost:5000' });

const getChannels = async (req, reply) => {
  try {
    const { userId } = req.query;

    const data = await instance.get('/channels?users_like=' + userId).then((res) => res.data);

    reply.send(data);
  } catch (err) {
    reply.send(err);
    console.error(err.response);
  }
};

const getUserById = async (req, reply) => {
  try {
    const { id } = req.params;

    const data = await instance.get('/users/' + id).then((res) => res.data);

    reply.send(data);
  } catch (err) {
    reply.send(err);
  }
};

const getChannelById = async (req, reply) => {
  try {
    const { id } = req.params;

    const data = await instance.get('/channels/' + id).then((res) => res.data);

    reply.send(data);
  } catch (err) {
    reply.send(err);
    console.error(err.response);
  }
};

const getUsers = async (req, reply) => {
  try {
    const { channelId } = req.query;

    const sortByName = (a, b) => {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    };

    const data = await instance
      .get('/channels/' + channelId)
      .then((res) => res.data?.users.map((id) => 'id=' + id));
    const userList = await instance
      .get(`/users?${data.join('&')}`)
      .then((res) => res.data?.sort(sortByName));

    reply.send(userList);
  } catch (err) {
    reply.send(err);
    console.error(err.response);
  }
};

const getMessages = async (req, reply) => {
  try {
    const { channelId } = req.query;

    const data = await instance.get('/messages?channelId=' + channelId).then((res) => res.data);

    const messageList = await Promise.all(
      data.map(async (msg) => {
        const user = await instance.get('/users/' + msg.userId).then((res) => res.data);

        return {
          ...msg,
          username: user.username,
          avatar: user?.avatar,
        };
      }),
    );

    reply.send(messageList);
  } catch (err) {
    reply.send(err);
    console.error(err.response);
  }
};

const postMessage = async (req, reply) => {
  try {
    const { userId, channelId, message, date } = req.body;

    const msgData = {
      channelId,
      message,
      userId,
      date,
    };

    const data = await instance
      .post('/messages', JSON.stringify(msgData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data);

    reply.code(201).send(data);
  } catch (err) {
    reply.send(err);
  }
};

const postChannel = async (req, reply) => {
  try {
    const { name, userId } = req.body;

    const chData = {
      name,
      createdBy: userId,
      date: new Date(),
      users: [userId],
    };

    const data = await instance.post('/channels', JSON.stringify(chData), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    reply.code(201).send(data.data);
  } catch (err) {
    reply.send(err);
  }
};

module.exports = {
  getMessages,
  getChannels,
  getChannelById,
  getUserById,
  getUsers,
  postChannel,
  postMessage,
};
