import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    email: { type: String, required: true, unique: true},
    age: {type: Number, required: true}
})

export default mongoose.model('users', UserSchema)