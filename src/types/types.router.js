const router = require('express').Router()
const typesService = require('./types.services')
const adminValidate = require('../middlewares/role.middleware')
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

router.route('/')
    .get(typesService.getAllTypes)
    .post(passport.authenticate('jwt', { session: false }), adminValidate, typesService.postType)

router.route('/:id')
    .get(typesService.getTypeByID)
    .delete(passport.authenticate('jwt', { session: false }), adminValidate, typesService.deleteType)

module.exports = router 