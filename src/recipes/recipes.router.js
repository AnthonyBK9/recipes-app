const router = require('express').Router()
const recipesServices = require('./recipes.services')
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

router.route('/')
    .get(recipesServices.getAllRecipes)
    .post( passport.authenticate('jwt', { session: false }), recipesServices.postRecipe)

router.route('/:recipes_id')
    .get(recipesServices.getRecipeById)
    .patch(passport.authenticate('jwt', { session: false }), recipesServices.patchRecipe)
    .delete(passport.authenticate('jwt', { session: false }), recipesServices.deleteRecipe)

module.exports = router