import express from 'express'
import { getUsersController, createUserController, getSingleUserController, deleteUserController, updateUserController } from '../controllers/usersController.js'

// router object
const router = express.Router()

router.get('/users', getUsersController)
router.post('/users', createUserController)
router.get('/users/:id', getSingleUserController)
router.delete('/users/:id', deleteUserController)
router.put('/users/:id', updateUserController)

export default router