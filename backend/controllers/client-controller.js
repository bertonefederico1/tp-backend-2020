'use strict'

const Client = require('../models/client-model');
const clientController = { };

clientController.getAll = async (req, res) => {
    await Client.findAll({
        attributes: ['id_cliente', 'dni', 'nombre', 'apellido', 'direccion', 'telefono']
    })
        .then( (clients) => {
            res.json(clients);
        })
        .catch ((err) => {
            console.log(err);
        })
}

clientController.getOne = async (req, res) => {
    await Client.findByPk(req.params.id)
        .then( (clients) => {
            res.json(clients);
        })
        .catch ((err) => {
            console.log(err);
        })
}

clientController.createClient = async (req, res) => {
    await Client.create({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        })
        .then(res.status(200).send('Client created'))
        .catch(err => console.log(err)); 
}

clientController.updateClient = async (req, res) => {
    await Client.update({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    }, {
        where: {
            id_cliente: req.params.id
        }
    })
        .then(res.status(200).send('Client updated'))
        .catch(err => console.log(err));
}

clientController.deleteClient = async (req, res) => {
    await Client.destroy({
        where: {
            id_cliente: req.params.id
        }
    })
        .then(res.status(200).send('Client deleted'))
        .catch(err => console.log(err));
}


module.exports = clientController;