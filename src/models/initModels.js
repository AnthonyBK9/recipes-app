const Categories = require('./categories.models')
const Ingredients = require('./ingredients.models')
const Instructions = require('./instructions.models')
const RecipesIngredients = require('./recipes_ingredients.models')
const Recipes = require('./recipes.models')
const Types = require('./types.models')
const UsersIngredients = require('./users_ingredients.models')
const UsersRecipes = require('./users_recipes.models')
const Users = require('./users.models')

const initModels = () => {
    //? hasMany llave foranea dentro de parentecis
    //? belongsTo llave foranea en primer parametro
    
    //* User 1:M Recipes
    Users.hasMany(Recipes)
    Recipes.belongsTo(Users)

    //* Users 1:M UsersRecipes
    Users.hasMany(UsersRecipes)
    UsersRecipes.belongsTo(Users)

    //* Users 1:M UsersIngredients
    Users.hasMany(UsersIngredients)
    UsersIngredients.belongsTo(Users)

    //* Ingredients 1:M UsersIngredients
    Ingredients.hasMany(UsersIngredients)
    UsersIngredients.belongsTo(Ingredients)

    //* Recipes 1:M UsersRecipes
    Recipes.hasMany(UsersRecipes)
    UsersRecipes.belongsTo(Recipes)

    //* Recipes 1:M RecipesIngredients
    Recipes.hasMany(RecipesIngredients)
    RecipesIngredients.belongsTo(Recipes)

    //* Categories 1:M Recipes
    Categories.hasMany(Recipes)
    Recipes.belongsTo(Categories)

    //* Recipes 1:M Instructinos
    Recipes.hasMany(Instructions)
    Instructions.belongsTo(Recipes)

    //* Types 1:M Ingredients
    Types.hasMany(Ingredients)
    Ingredients.belongsTo(Types)

    //* Ingredients 1:M RecipesIngredients
    Ingredients.hasMany(RecipesIngredients)
    RecipesIngredients.belongsTo(Ingredients)

}

module.exports = initModels