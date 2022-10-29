const Categories = require('../models/categories.models')

//? Ver todas las categorías
const getAllCategories = async () => {
    const data = await Categories.findAll()
    return data
}

//? Var una categoría en específico
const getCategoryById = async (id) => {
    const data = await Categories.findOne({
        where: {
            id
        }
    })
}

//? Crear categoría
const createCategories = async (name) => {
    const newCategories = await Categories.create({
        name
    })
    return newCategories
}

//? Eliminar categoría

const deleteCategories = async (id) => {
    const data = await Categories.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategories,
    deleteCategories
}