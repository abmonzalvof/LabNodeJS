import mongoose,{Document, Schema} from "mongoose"

export class Comment {
    id: string = ''
    author: string = ''
    content: string = ''
}

export interface IComment extends Document {
    author: string,
    content: string
}
export const CommentScheme = new Schema<IComment>(
    {
        author: {
            type: String,
            required: [true, 'Property is required']
        },
        content: {
            type: String,
            required: [true, 'Property is required']
        }
    },
    {
        timestamps: true
    }
)

export const CommentModel = mongoose.model<IComment>('Comment', CommentScheme)