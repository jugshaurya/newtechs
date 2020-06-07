export default {
  Query: {
    me: (parent, args, context) => context.me,
    users: (parent, args, context) => Object.values(context.models.users),
    user: (parent, args, context) => context.models.users[args.id],
  },
  User: {
    slug: (parent) => parent.username.split(' ').join('-'),
    messages: (parent, args, context) =>
      parent.messageIds.map((messageId) => context.models.messages[messageId]),
  },
};
