const users = {
  1: {
    id: 1,
    name: 'Shaurya Singhal',
    messageIds: [1, 2],
  },
  2: {
    id: 2,
    name: 'Shaurya Singhal #2',
    messageIds: [3],
  },
  3: {
    id: 3,
    name: 'Shaurya Singhal #3',
    messageIds: [],
  },
};

const messages = {
  1: {
    id: 1,
    text: 'Learing GraphQL',
    userId: 1,
  },
  2: {
    id: 2,
    text: 'Learing Apollo',
    userId: 3,
  },
  3: {
    id: 3,
    text: 'Learing Next.js',
    userId: 2,
  },
};

export default { users, messages };
