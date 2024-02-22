'use strict'

import { Router } from 'express'
import { 
    deleteA,
    get,
    save, 
    search, 
    test, 
    update
} from './animal.controller.js'
import {
    validateJwt,
    isAdmin
} from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/test', test)

//Rol Admin
api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id',[validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteA)

//Rol cliente y administrador
api.get('/get', [validateJwt], get)
api.post('/search', [validateJwt], search)

export default api