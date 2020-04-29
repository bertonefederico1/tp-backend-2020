'use strict'

const Supplier = require('../models/supplier-model');
const supplierController = { };

supplierController.getAll = async (req, res) => {
    await Supplier.findAll({
        attributes: ['id_proveedor', 'cuit', 'razon_social', 'ciudad', 'direccion', 'telefono']
    })
        .then( (suppliers) => {
            res.json(suppliers);
        })
        .catch ((err) => {
            console.log(err);
        })
}

supplierController.getOne = async (req, res) => {
    await Supplier.findByPk(req.params.id, {
        attributes: ['id_proveedor', 'cuit', 'razon_social', 'ciudad', 'direccion', 'telefono']
    })
        .then( (suppliers) => {
            res.json(suppliers);
        })
        .catch ((err) => {
            console.log(err);
        })
}

supplierController.createSupplier = async (req, res) => {
    await Supplier.create({
            cuit: req.body.cuit,
            razon_social: req.body.razon_social,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        })
        .then(supplier => console.log(supplier));   
}

supplierController.updateSupplier = async (req, res) => {
    await Supplier.update({
        cuit: req.body.cuit,
        razon_social: req.body.razon_social,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    }, {
        where: {
            id_proveedor: req.params.id
        }
    })
        .then(res.status(200).send('Supplier updated'))
        .catch(err => console.log(err));
}

supplierController.deleteSupplier = async (req, res) => {
    await Supplier.destroy({
        where: {
            id_proveedor: req.params.id
        }
    })
        .then(res.status(200).send('Supplier deleted'))
        .catch(err => console.log(err));
}

module.exports = supplierController;