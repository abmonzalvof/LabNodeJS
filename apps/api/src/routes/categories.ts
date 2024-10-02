import express from 'express'
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categories'

//Variables
const router = express.Router()

//Router functions
router.route('/').get(getCategories)
router.route('/:id').get(getCategory)
router.route('/').post(createCategory)
router.route('/:id').patch(updateCategory)
router.route('/:id').delete(deleteCategory)

//Router configurations
export default router