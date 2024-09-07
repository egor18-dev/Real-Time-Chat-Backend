import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        minlength: 8
    }
});

const User = mongoose.model('User', userSchema);

export default User;