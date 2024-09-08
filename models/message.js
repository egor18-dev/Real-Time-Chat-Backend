import mongoose from "mongoose";
const {Schema} = mongoose;

const messageSchema = new Schema({
    userId: {
        type: String
    },
    message: {
        type: String
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;