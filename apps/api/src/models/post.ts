import mongoose,{Document, Schema} from "mongoose"
import {Comment} from './comment'

export class Post {
    id: number = 0
    title: string = ''
    image: string = ''
    description: string = '' 
    category: string
    comments: Array<Comment>
}
export interface IPost extends Document{
    title: string,
    image: string,
    description: string,
    category: string,
    comments: Array<Comment>
}
export const PostScheme = new Schema<IPost>(
    {
        title: {
            type: String,
            required: [true, 'Property is required']
        },
        image: {
            type: String,
            required: [true, 'Property is required']
        },
        description: {
            type: String,
            required: [true, 'Property is required']
        },
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories',
            required: [true, 'Category is required']
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments',
        }]
    },
    {
        timestamps: true
    }
)
export const PostModel = mongoose.model<IPost>('Post', PostScheme)
