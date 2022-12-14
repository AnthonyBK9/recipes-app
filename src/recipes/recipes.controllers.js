const uuid = require('uuid')
const Recipes = require('../models/recipes.models')
const Users = require('../models/users.models')
const Categories = require('../models/categories.models')
const Instructions = require('../models/instructions.models')
const RecipesIngredients = require('../models/recipes_ingredients.models')
const Ingredients = require('../models/ingredients.models')
const Types = require('../models/types.models')
const UsersIngredients = require('../models/recipes_ingredients.models')
const { Op } = require("sequelize");

const getAllRecipes = async () => {
    const data = await Recipes.findAll({
        attributes: {
            exclude: ['userId', 'categoryId']
        },
        include: [
            {
                model: Categories,
            },
            {
                model: Users,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Instructions,
                attributes: ['description', 'step']
            },
            {
                model: RecipesIngredients,
                attributes:{
                    exclude: ['id','createdAt', 'updatedAt']
                },
                include: {
                    model: Ingredients,
                    include: {
                        model: Types
                    }
                }
            }
        ],
    })
    return data
}

const getRecipeById = async (id) => {
    const data = await Recipes.findOne({
        where: {
            id
        },
        attributes: {
            exclude: ['userId', 'categoryId']
        },
        include: [
            {
                model: Categories,
            },
            {
                model: Users,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Instructions,
                attributes: ['description', 'step']
            },
            {
                model: RecipesIngredients,
                attributes:{
                    exclude: ['id','createdAt', 'updatedAt']
                },
                include: {
                    model: Ingredients,
                    include: {
                        model: Types
                    }
                }
            }
        ]
    })
    return data
}

const createRecipe = async (data) => {
    const newRecipe = await Recipes.create({
        id: uuid.v4(),
        title: data.title,
        description: data.description,
        urlImg: data.urlImg,
        time: data.time,
        portions: data.portions,
        userId: data.userId,
        categoruId: data.categoruId,
        origin: data.origin,
        likes: data.likes,
    })
    return newRecipe
}

const updateRecipe = async (id, data) => {
    const response = await Recipes.update(data, {
        where: {
            id
        }
    })
    return response
}

const deleteRecipe = async (id) => {
    const data = await Recipes.destroy({ 
        where: {
            id
        }
    })
    return data
}

const getMyRecipe = async (userId) => {
    const usersIngredients = await UsersIngredients.findAll({
        attributes: ['ingredientId'],
        where: {
            userId
        }
    })

    const filteredIngredients = usersIngredients.map(obj => obj.ingredientId)
    const recipeIngredients = await RecipesIngredients.findAll({
        where: {
            ingredientId: {
                [Op.in]: filteredIngredients
            }
        }
    })

    const filteredRecipes = recipeIngredients.map(obj => obj.recipeId)
    const data = await Recipes.findAll({
        where: {
            id: {
                [Op.in]: filteredRecipes
            }
        }
    })
    
    return data
}

module.exports = {
    getAllRecipes,    
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getMyRecipe
}