import { CommentModel } from "../models/comment"
import { PostModel } from "../models/post"
import mongoose from "mongoose"

//GET get all post
export const getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find() 
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

//GET get all post by a specific ID of CATEGORY
export const getPostsByCategory = async (req, res, next) => {
  try {
    const {categoryID} = req.params
    const posts = await PostModel.findOne({category: new mongoose.Types.ObjectId(categoryID)}) 
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

//GET get a specific post by ID
export const getPost = async (req, res, next) => {
  try {
    const {id} = req.params
    const post = await PostModel.findById(id) 
    if(!post){
      return res.status(401).json({message: 'Not found'})
    }
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

//POST create a post
export const createPost = async (req, res, next) => {
  try {
    const post = await PostModel.create(req.body)
    res.status(201).json(post)
  } catch (error) {
      next(error)
    }
}

//POST create a comment in a specific post by ID
export const createComment = async (req, res, next) => {
  try {
    const {id} = req.params
    const comment = await CommentModel.create(req.body)
    const post = await PostModel.findById(id)
    if(!post){
      return res.status(401).json({message: 'Not found'})
    }
    post.comments.push(comment._id)
    const updatePost = await PostModel.findByIdAndUpdate(id,post,{new: true})
    res.status(200).json(updatePost)

  } catch (error) {
    next(error)
  }
}

//PATCH update a specific post by ID (comments cannot be updated)
export const updatePost = async (req, res, next) => {
  try {
    const {id} = req.params
    const post = await PostModel.findByIdAndUpdate(id, req.body, {new: true}) 
    if(!post){
      return res.status(401).json({message: 'Not found'})
    }
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

//DELETE delete a specific post by ID
export const deletePost = async (req, res, next) => {
  try {
    const {id} = req.params
    const post = await PostModel.findByIdAndDelete(id)
    if(!post){
      return res.status(401).json({message: 'Not found'})
    }
      res.status(204).send()
  } catch (error) {
    next(error)
  }
}