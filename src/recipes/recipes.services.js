const recipesControllers = require('./recipes.controllers')

const getAllRecipes = (req, res) => {
    recipesControllers.getAllRecipes()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

const getRecipeById = (req, res) => {
    const id = req.params.recipe_id
    recipesControllers.getRecipeById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({msg: 'Invalid ID', id})
            }
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

const postRecipe = (req, res) => {
    const userId = req.user.id
    const { title, description, urlImg, time, portions, categoryId, origin } = req.body
    if (title && description && time && portions && categoryId ) {
        recipesControllers.createRecipe({ title, description, urlImg, time, portions, categoryId, origin, userId})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json({ err: err.message})
            })
    } else {
        res.status(404).json({
            msg: 'Missing Data', 
            fields: {
                title: 'String',
                description: 'String',
                time: 'Number',
                portions: 'Number',
                categoryId: 'Number'
            }
        })
    }
}

const patchRecipe = (req, res) => {
    const { title, description, urlImg, time, portions, categoryId, origin } = req.body
    const id = req.params.recipe_id
    recipesControllers.updateRecipe(id, { title, description, urlImg, time, portions, categoryId, origin })
        .then(data => {
            if(data[0]){
                res.status(200).json({msg: `Recipe with id ${id} edited successfully!!`})
            } else {
                res.status(404).json({msg: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({ err: err.message})
        })
}

const deleteRecipe = (req, res) => {
    const id = req.params.recipe_id
    recipesControllers.deleteRecipe(id)
        .then(data => {
            if (data) {
                res.status(204).json()
            } else {
                res.status(404).json({msg: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({ err: err.message})
        })
}

const getUserRecipes = (req, res) => {
    const userId = req.user.id
    recipesControllers.getMyRecipe(userId)
        then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    postRecipe,
    patchRecipe,
    deleteRecipe,
    getUserRecipes
}