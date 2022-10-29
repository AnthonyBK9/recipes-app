const controllersTypes = require('./types.controllers')

const getAllTypes = (req, res) => {
    controllersTypes.getAllTypes()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

const getTypeByID = (req, res) => {
    const id = req.params.id
    controllersTypes.getTypeByID(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(400).json({msg: 'Invalid ID'})
            }
        })
        .catch(err => { 
            res.status(400).json({ msg: err.message})
        })
}

const postType = (req, res) => {
    const {name} = req.body
    if (name) {
        controllersTypes.createType(name)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json({ msg: err.message})
            })
    } else {
        res.status(400).json({ 
            msg: 'Invalid Data',
            fields: {
                name: 'String'
            }
        })
    }
}

const deleteType = (req, res) => {
    const id = req.params.id
    controllersTypes.deleteUser(id)
        .then(data => {
            if (data) {
                res.status(204).json()
            } else {
                res.status(404).json({msg: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

module.exports = {
    getAllTypes,
    getTypeByID,
    postType,
    deleteType
}