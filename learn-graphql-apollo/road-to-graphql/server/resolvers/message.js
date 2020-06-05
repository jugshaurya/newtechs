export default {
  Query: {
    messages: (parent, args, context) => Object.values(context.models.messages),
    message: (parent, args, context) => context.models.messages[args.id],
  },

  Message: {
    user: (parent, args, context) => context.models.users[parent.userId],
  },

  Mutation: {
    createMessage: (parent, args, context) => {
      const id = Object.values(context.models.messages).length + 1; // can use uuid for unique ids
      const newMessage = {
        id,
        text: args.text,
        userId: context.me.id,
      };
      context.models.messages[id] = newMessage;
      context.models.users[me.id].messageIds.push(id);
      return newMessage;
    },

    deleteMessage: (parent, args, context) => {
      const { [id]: message, ...otherMessages } = context.models.messages;
      if (!message) return false;
      context.models.messages = otherMessages;
      return true;
    },
  },
};
