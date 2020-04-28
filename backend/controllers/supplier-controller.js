const Supplier = require('../models/supplier-model');
const supplierController = { };

supplierController.getAll = async (req, res) => {
    await Supplier.findAll({
        attributes: ['id_proveedor', 'cuit', 'razon social', 'ciudad', 'direccion', 'telefono']
    })
        .then( (Suppliers) => {
            res.json(Suppliers);
        })
        .catch ((err) => {
            console.log(err);
        })
}

supplierController.getOne = async (req, res) => {
    await Supplier.findByPk(req.params.id, {
        attributes: ['id_proveedor', 'cuit', 'razon social', 'ciudad', 'direccion', 'telefono']
    })
        .then( (Suppliers) => {
            res.json(Suppliers);
        })
        .catch ((err) => {
            console.log(err);
        })
}

supplierController.createSupplier = async (req, res) => {
    await Supplier.create({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        })
        .then(Supplier => console.log(Supplier));   
}

module.exports = supplierController;