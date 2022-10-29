const categoryController = require('./categories.controllers')

const getAllCategories = (req, res) => {
    categoryController.getAllCategories()
        .then(data => {
            res.tstus(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ err: err.message})
        })
}

const getCategoryById = (req, res) => {
    const id = req.params.id
    categoryController.getCategoryById(id)
        .then(data => {
            if(data) {
                res.status(200).json(response)
            } else {
                res.status(404).json({msg: `ID: ${id}, not exists`})
            }
        })
        .catch(err => {
            res.status(400).json({ err: err.message})
        })
}

const postCategory = (req, res) => {
    const {name} = req.body
    if (name) {
        categoryController.createCategories(name)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({ err: err.message})
        })
    } else {
        res.status(400).json({
            message: 'Invalid Data',
            fields:  {
                name: 'String'
            }
        })
    }
}

const deleteCategory = (req, res) => {
    const id = req.params.id
    categoryController.deleteCategories(id)
        .then(data => {
            if (data) {
                res.status(204).json()
            } else {
                res.status(404).json({msg: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({msg: err.message});
        })
}

module.exports = {
    getAllCategories,
    getCategoryById,
    postCategory,
    deleteCategory
}