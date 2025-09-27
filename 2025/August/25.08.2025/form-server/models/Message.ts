import mongoose, { Types, Document } from "mongoose";

export interface IMessage extends mongoose.Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new mongoose.Schema<IMessage>({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true
    },
    content: { 
        type: String, 
        required: true 
    },
}, {
    timestamps: true 
});

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;