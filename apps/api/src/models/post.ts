export class Post {
    id: number = 0
    title: string = ''
    image: string = ''
    description: string = '' 
    category: number
    comments: Array<Comment>
}
export class Comment {
    id: number = 0
    author: string = ''
    content: string = ''
}