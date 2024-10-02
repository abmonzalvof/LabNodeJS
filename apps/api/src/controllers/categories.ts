import { Category } from '../models/category'

//Variables
const categories: Array<Category> = []
let id = 0

//Functions
function categoryById(req): number {
  const {id} = req.params
  return categories.findIndex( item => item.id == id)
}

//GET all categories
export const getCategories = (req,res) => {
    res.status(200).json(categories)
}

//GET a specific category by ID
export const getCategory = (req,res) => {
    const index = categoryById(req)
  if(index > -1){
    res.status(200).json(categories[index])
  } else {
    res.status(404).json({message: 'Category not found'})
  }
}

//POST create a category
export const createCategory = (req, res) => {
    const {name} = req.body
    if(name){
      const category: Category = {
        id,
        name
      }
      categories.push(category)
      res.status(201).json(category)
      id += 1
    } else {
      return res.status(400).json({message: 'Name is required'})
    }
}

//PATCH update a specific category by ID
export const updateCategory = (req, res) => {
    const {name} = req.body
    const index = categoryById(req)
    if(name && index > -1){
      const category: Category = categories[index]
      category.name = name
      categories[index] = category
      res.status(200).json(category)
      id += 1
    } else {
      if(index < 0){
        return res.status(404).json({message: 'Not found'})
      }
      if(!name){
        return res.status(400).json({message: 'Name is required'})
      }
    }
}

//DELETE delete a especific category by ID
export const deleteCategory = (req, res) => {
    const index = categoryById(req)
    if(index > -1){
      categories.splice(index,1)
      res.status(204).send()
      id += 1
    } else {
        return res.status(404).json({message: 'Not found'})
    }
}