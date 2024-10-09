import { CategoryM } from '../models/category'


//GET all categories
export const getCategories = async (req,res,next) => {
  try{
    const categories = await CategoryM.find()
    res.status(200).json(categories)
  }catch(error){
    next(error)
  }
}

//GET a specific category by ID
export const getCategory = async (req,res,next) => {
    try{
      const {id} = req.params
      const category = await CategoryM.findById(id)
      res.status(200).json(category)
    }catch(error){
      next(error)
    }
}

//POST create a category
export const createCategory = async (req, res, next) => {
  try {
    const category = await CategoryM.create(req.body)
    res.status(201).json(category)
  } catch (error) {
    next(error)
  }
}

//PATCH update a specific category by ID
export const updateCategory = async (req, res, next) => {
    try {
      const {id} = req.params
      const category = await CategoryM.findByIdAndUpdate(id, req.body, {new: true})
      if(!category){
        return res.status(401).json({message: 'Not found'})
      }
      res.status(200).json(category)
      
    } catch (error) {
      next(error)
    }
}

//DELETE delete a especific category by ID
export const deleteCategory = async (req, res, next) => {
  try {
    const {id} = req.params
    const category = await CategoryM.findByIdAndDelete(id)
    if(!category){
      return res.status(401).json({message: 'Not found'})
    }
      res.status(204).send()
  } catch (error) {
    next(error)
  }
}