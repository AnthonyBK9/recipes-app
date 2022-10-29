const Types = require('../models/types.models')

const getAllTypes = async () => {
    const data = await Types.findAll()
    return data
}

const getTypeByID = async (id) => {
    const data = await Types.findOne({
        where: {
            id
        }
    })
    return data
}

const createType = async (name) => {
    const newType = await Types.create({
        name
    })
    return newType
}

const deleteUser = async (id) => {
    const data = await Types.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    getAllTypes,
    getTypeByID,
    createType,
    deleteUser
}