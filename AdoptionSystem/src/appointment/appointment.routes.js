'use strict'

import { Router } from 'express'
import { newAppointment } from './appointment.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

//Rutas privadas cliente
api.post('/save', [validateJwt], newAppointment)

export default api