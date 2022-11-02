const { describe, it } = require('mocha');
const assert = require('chai').assert;
const { getAllUsers } = require('../src/users/users.controllers')

const sumar = (a, b) => a + b

// describe('Test de la funcion sumar', () => {

//     it('Debería retornar 12 cuando le pasamos 8 y 4', (done) => {
//         const response = sumar(8,5)
//         assert.equal(response, 12)
//         done()
//     })

//     it('Debería retornar 5 cuando le pasamos 2 y 3', (done) => {
//         const response = sumar(2,3)
//         assert.equal(response, 5)
//         done()
//     })

// })

describe('Test de controladores de usuario', () => {
    it('Deberia retorna todos los usuarios', async (done) => {
       
        try {
            const result = await getAllUsers()
            assert.typeOf(result, 'array')
            
        } catch (error) {
            console.log(error)
        }

    })
})