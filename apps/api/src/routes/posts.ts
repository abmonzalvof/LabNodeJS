import express from 'express'
import { createComment, createPost, deletePost, getPost, getPosts, getPostsByCategory, updatePost } from '../controllers/posts'

//Variables
const router = express.Router()

//Router functions
router.route('/').get(getPosts)
router.route('/category/:category').get(getPostsByCategory)
router.route('/:id').get(getPost)
router.route('/').post(createPost)
router.route('/:id/comments').post(createComment)
router.route('/:id').patch(updatePost)
router.route('/:id').delete(deletePost)

//Router configurations
export default router