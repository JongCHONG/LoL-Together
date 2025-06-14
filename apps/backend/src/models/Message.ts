import { Schema, model, Document, Types } from 'mongoose';

interface IMessage extends Document {
  text: string;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  conversation?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  text: {
    type: String,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation"
  }   
}, {
  timestamps: true
});

// MessageSchema.post('findOneAndDelete', async function(message: IMessage) {
//   if (message) {
//     await model('User').findOneAndUpdate(
//       { _id: message.sender },
//       { $pull: { messages: message._id } }
//     );
//     await model('Conversation').findOneAndUpdate(
//       { _id: message.conversation },
//       { $pull: { messages: message._id } }
//     );
//   }
// });

// MessageSchema.post('save', async function(message: IMessage) {
//   if (message.conversation) {
//     await model('Conversation').findOneAndUpdate(
//       { _id: message.conversation },
//       { $push: { messages: message._id } }
//     );
//   } else {
//     const newConversation = await model('Conversation').create({ 
//       users: [message.sender, message.receiver],
//       messages: [message._id]
//     });

//     await model('User').updateMany(
//       { _id: { $in: [message.sender, message.receiver] } },
//       { $push: { conversations: newConversation._id } }
//     );

//     await model('Message').findOneAndUpdate(
//       { _id: message._id },
//       { conversation: newConversation._id }
//     );
//   }
// });

const Message = model<IMessage>("Message", MessageSchema);

export default Message;