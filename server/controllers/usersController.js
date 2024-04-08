import UsersModel from "../models/users.js";

// get all users
export const getUsersController = async (req, res) => {
    try {
        const users = await UsersModel.find({})
        res.status(200).send({
            success: true,
            message: 'All users List',
            users
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: true,
            message: 'Error while getting orders',
            error
        })
    }
}

// Create User
export const createUserController = async (req, res) => {
    try {
        const {name, email, age} = req.body
        if(!name){
            return res.status(401).send({ message: 'Name is required!'})
        }
        const existingEmail = await UsersModel.findOne({ name })
        if(existingEmail){
            return res.status(200).send({
                success: false,
                message: 'Email Already Exists!'
            })
        }
        if(!age){
            return res.status(401).send({ message: 'Age is required!'})
        }
        const user = await new UsersModel({ name, email, age }).save()
        res.status(201).send({
            success: true,
            message: 'New user created',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in user',
        })
    }
}

// get single user by id
export const getSingleUserController = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UsersModel.findOne({_id: id})
        res.status(200).send({
            success: true,
            message: 'Get Single user successfully!',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while getting single user',
        })
    }
}

// delete user by id
export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UsersModel.findByIdAndDelete({_id: id})
        res.status(200).send({
            success: true,
            message: 'Deleted user successfully!'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while deleting user',
            error
        })
    }
}

// update user by id
export const updateUserController = async (req, res) => {
    try {
        const { name, email, age } = req.body
        const { id } = req.params
        if(!name){
            return res.status(401).send({ message: 'Name is required!'})
        }
        const existingEmail = await UsersModel.findOne({ email })
        if(existingEmail){
            return res.status(200).send({
                success: false,
                message: 'Email Already Exists!'
            })
        }
        if(!age){
            return res.status(401).send({ message: 'Age is required!'})
        }
        const user = await UsersModel.findByIdAndUpdate({_id: id}, { name: req.body.name, email: req.body.email, age: req.body.age }, {new: true})
        res.status(200).send({
            success: true,
            message: 'User updated successfully!',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while updating user',
            error
        })
    }
}