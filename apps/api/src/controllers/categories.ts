import { CategoryM } from '../models/category'


//GET all categories
export const getCategories = async (req,res) => {
  try{
    const categories = await CategoryM.find()
    res.status(200).json(categories)
  }catch(e){
    const {message} = e
    res.status(500).json({message})
  }
}

//GET a specific category by ID
export const getCategory = async (req,res) => {
    try{
      const {id} = req.params
      const category = await CategoryM.findById(id)
      res.status(200).json(category)
    }catch(e){
      const {message} = e
      res.status(500).json({message})
    }
}

//POST create a category
export const createCategory = async (req, res) => {
    const {name} = req.body
    if(name){
      try {
        const category = await CategoryM.create(req.body)
        res.status(201).json(category)
      } catch (error) {
        const {message} = error
          res.status(500).json({message})
      }
    } else {
      return res.status(400).json({message: 'Name is required'})
    }
}

//PATCH update a specific category by ID
export const updateCategory = async (req, res) => {
    try {
      const {id} = req.params
      const category = await CategoryM.findByIdAndUpdate(id, req.body, {new: true})
      if(!category){
        return res.status(401).json({message: 'Not found'})
      }
      res.status(200).json(category)
      
    } catch (error) {
        const {message} = error
        res.status(500).json({message})
    }
}

//DELETE delete a especific category by ID
export const deleteCategory = async (req, res) => {
  try {
    const {id} = req.params
    const category = await CategoryM.findByIdAndDelete(id)
    if(!category){
      return res.status(401).json({message: 'Not found'})
    }
      res.status(204).send()
  } catch (error) {
    const {message} = error
    res.status(500).json({message})
  }
}