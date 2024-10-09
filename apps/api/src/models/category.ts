import mongoose,{Document, Schema} from "mongoose"

export class Category {
    id: number = 0
    name: string = ''
    constructor(){}
}
export interface ICategory extends Document {
    name: string
}

export const CategorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: [true, 'Property is required']
        }
    },
    {
        timestamps: true
    }
)
export const CategoryM = mongoose.model<ICategory>('Category', CategorySchema)