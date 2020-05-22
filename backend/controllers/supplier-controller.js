'use strict'

const Supplier = require('../models/supplier-model');
const Article = require('../models/article-model');
const Supplier_Article = require('../models/supplier-article-model');
const supplierController = { };

Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey:'id_proveedor'});
Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey:'id_articulo'});  


 supplierController.getAll = async (req, res) => {
    await Supplier.findAll({
        where: {
            activo: 1
        },
        include: Article, 
        required: true
    })
        .then((suppliers) => {
            res.json(suppliers);
        })
        .catch(err => console.log(err))
}

supplierController.getOne = async (req, res) => {
    await Supplier.findByPk(req.params.id)
        .then((suppliers) => { res.json(suppliers); })
        .catch (err => { console.log(err); })
}

supplierController.createSupplier = async (req, res) => {
    await Supplier.create({
            cuit: req.body.cuit,
            razon_social: req.body.razon_social,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        })
        .then(res.json("Supplier created"))
        .catch(err => console.log(err)); 
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
        .then(res.json('Supplier updated'))
        .catch(err => console.log(err));
}

supplierController.deleteSupplier = async (req, res) => {
    await Supplier.destroy({
        where: {
            id_proveedor: req.params.id
        }
    })
        .then(res.json('Supplier deleted'))
        .catch(err => console.log(err));
}

supplierController.suspendSupplier = async (req, res) => {
    await Supplier.update(
        {activo: 0},
        {where: { id_proveedor: req.params.id }}
    )
        .then(res.json('Supplier suspended'))
        .catch(err => console.log(err));
}

module.exports = supplierController;