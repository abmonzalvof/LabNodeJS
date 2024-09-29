import express from 'express'
const router = express.Router()

const posts = []
let id = 0
let idComment = 0
router.route('/').get((req,res)=>{
  res.status(200).json(posts)
})
router.route('/category/:category').get((req,res)=>{
    const {category} = req.params
  res.status(200).json(posts.filter(item => item.category == category))
})
router.route('/:id').get((req,res)=>{
  const index = postById(req)
  if(index > -1){
    res.status(200).json(posts[index])
  } else {
    return res.status(404).json({message: 'Post not found'})
  }
})
router.route('/').post((req,res)=>{
  const {title, image, description, category} = req.body
  if(title && image && description && category ){
    const post = {
      id: id,
      title, image, description, 
      category: parseInt(category),
      comments: []
    }
    posts.push(post)
    res.status(201).json(post)
    id += 1
  } else {
    if(!title){
        return res.status(400).json({message: 'Title is required'})
    }
    if(!image){
        return res.status(400).json({message: 'Image is required'})
    }
    if(!description){
        return res.status(400).json({message: 'Description is required'})
    }
    if(!category){
        return res.status(400).json({message: 'Category is required'})
    }
  }
})
router.route('/:id/comments').post((req,res)=>{
  const {author, content} = req.body
  const index = postById(req)
  if(index > -1){
    if(author && content){
        const comment = {
            id: idComment,
            author, content
        }
        posts[index].comments = posts[index].comments.concat([comment])
        res.status(201).json(comment)
        idComment += 1
    } else {
        if(!author){
            return res.status(400).json({message: 'Author is required'})
        }
        if(!content){
            return res.status(400).json({message: 'Content is required'})
        }
    }
  } else {
    return res.status(404).json({message: 'Post not found'})
  }
})
router.route('/:id').patch((req,res)=>{
  const {title, image, description, category} = req.body
  const index = postById(req)
  if(index > -1){
    if(title || image || description || category){
        const post = posts[index]
        post.title = title ??  post.title
        post.image = image ?? post.image
        post.description = description ?? post.description
        post.category = category ?? post.category
        posts[index] = post
        res.status(200).json(post)
    } else {
        return res.status(400).json({message: 'A field is required'})
    }
  } else {
    return res.status(404).json({message: 'Post no found'})
  }
})
router.route('/:id').delete((req,res)=>{
  const index = postById(req)
  if(index > -1){
    posts.splice(index,1)
    res.status(204).send()
    id += 1
  } else {
      return res.status(404).json({message: 'Not found'})
  }
})
function postById(req): number {
  const {id} = req.params
  return posts.findIndex( item => item.id == id)
}
export default router