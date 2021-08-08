const {
  getMessages,
  getChannels,
  getUserById,
  getChannelById,
  getUsers,
  postChannel,
  postMessage,
} = require('../controllers/messages');

// Message schema
const Message = {
  type: 'object',
  properties: {
    channelId: { type: 'integer' },
    message: { type: 'string' },
    userId: { type: 'integer' },
    date: { type: 'string' },
    id: { type: 'integer' },
  },
};

// User schema
const User = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    id: { type: 'integer' },
    avatar: { type: 'string' },
  },
};

// Channel schema
const Channel = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    users: { type: 'array' },
    id: { type: 'integer' },
  },
};

// Options for /getChannels
const getChannelsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        message: Channel,
      },
    },
  },
  handler: getChannels,
};

// Options for /getUserById
const getUserByIdOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUserById,
};

// Options for /getChannelById
const getChannelByIdOpts = {
  schema: {
    response: {
      200: Channel,
    },
  },
  handler: getChannelById,
};

// Options for /getUsers
const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        message: User,
      },
    },
  },
  handler: getUsers,
};

// Options for /getMessages
const getMessagesOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        message: Message,
      },
    },
  },
  handler: getMessages,
};

// Options for /postMessage
const postMessageOpts = {
  schema: {
    response: {
      200: Message,
    },
    response: {
      201: Message,
    },
  },
  handler: postMessage,
};

// Options for /postChannel
const postChannelOpts = {
  schema: {
    response: {
      200: Channel,
    },
    response: {
      201: Channel,
    },
  },
  handler: postChannel,
};

function itemRoutes(fastify, options, done) {
  // Get messages by channelId
  fastify.get('/messages', getMessagesOpts);

  // Get user by userId
  fastify.get('/users/:id', getUserByIdOpts);

  // Get channels by userId
  fastify.get('/channels', getChannelsOpts);

  // Get channel by channelId
  fastify.get('/channels/:id', getChannelByIdOpts);

  // Get users by channelId
  fastify.get('/users', getUsersOpts);

  // Add message
  fastify.post('/messages', postMessageOpts);

  // Add channel
  fastify.post('/channels', postChannelOpts);

  done();
}

module.exports = itemRoutes;
