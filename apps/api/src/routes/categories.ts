import express from 'express'
const router = express.Router()

const categories = []
let id = 0
router.route('/').get((req,res)=>{
  res.status(200).json(categories)
})
router.route('/:id').get((req,res)=>{
  const index = categoryById(req)
  if(index > -1){
    res.status(200).json(categories[index])
  } else {
    res.status(404).json({message: 'Category not found'})
  }
})
router.route('/').post((req,res)=>{
  const {name} = req.body
  if(name){
    const category = {
      id: id,
      name
    }
    categories.push(category)
    res.status(201).json(category)
    id += 1
  } else {
    return res.status(400).json({message: 'Name is required'})
  }
})
router.route('/:id').patch((req,res)=>{
  const {name} = req.body
  const index = categoryById(req)
  if(name && index > -1){
    const category = categories[index]
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
})
router.route('/:id').delete((req,res)=>{
  const index = categoryById(req)
  if(index > -1){
    categories.splice(index,1)
    res.status(204).send()
    id += 1
  } else {
      return res.status(404).json({message: 'Not found'})
  }
})
function categoryById(req): number {
  const {id} = req.params
  return categories.findIndex( item => item.id == id)
}
export default router