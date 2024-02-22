'use strict'

import Animal from '../animal/animal.model.js'
import User from '../user/user.model.js'
import Appointment from './appointment.model.js'

export const newAppointment = async(req, res)=>{
    try{
        //Capturar la data
        let data = req.body
        data.user = req.user._id
        //Verificar que exista el animal
        let foundedAnimal = await Animal.findOne({_id: data.animal})
        if(!foundedAnimal) return res.status(404).send({message: 'Animal not found'})
        //Validar que la mascota no tenga una cita activa con esa persona
        //EJERCICIO: solo pueda tener una cita por dia
        //Validar si un animal ya tiene cuta o si un usuario ya tiene cita
        let appointmentExist = await Appointment.findOne({
            $or: [
                {
                    animal: data.animal,
                    user: data.user
                },
                {
                    user: data.user,
                    date: data.date
                }
            ]
        })
        /* if(animal == data.animal || user == data.user) */
        if(appointmentExist) return res.send({message: 'Appointment already exist'})
        //Guardar
        let appointment = new Appointment(data)
        await appointment.save()
        return res.send({message: `Appointment is saved succesfully for date: ${appointment.date}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error saving appointment', err})
    }
}