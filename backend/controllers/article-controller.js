'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const articleController = { };



articleController.getAll = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: Supplier,
      required: true,
      where: {
        activo: 1
      }
    }); 
    res.json(articles);
  } catch (err){
    res.json(err);
  }
  
}


articleController.getOne = async (req, res) => {
  try {
    const article = await Article.findOne({
      include: Supplier,
      where: {
        id_articulo: req.params.id,
        activo: 1
      }
    }); 
    res.json(article);
  } catch (err){
    res.json(err);
  }
}


articleController.createArticle = async (req, res) => {
    try{
      await Article.create({
        descripcion: req.body.descripcion,
        precio: req.body.precio
      });
      res.json("article created");
    } catch(err){
      res.json(err);
    }
}


articleController.updateArticle = async (req, res) => {
    try {
      await Article.update({
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock
      }, {
        where: {
          id_articulo: req.params.id
        }
      });
      res.json("Article updated");
    } catch (err){
      res.json(err);
    }
}


articleController.loadStock = async (req, res) => {
  let cant_total = 0;
  let cantidad = parseInt(req.body.cantidad);
  
    try {
      const article = await Article.findByPk(req.body.id_articulo,{
        attributes: ['stock']
      });
      cant_total = article.stock + cantidad;
    
        
      await Article.update({
        stock: cant_total
      },{
        where: { 
          id_articulo: req.body.id_articulo 
        }
      });
      res.json("Article updated");
    } catch (err) {
      res.json(err);
    }
   
}

articleController.suspendArticle = async (req, res) => {
  try {
    await Article.update({
      activo: 0
      }, {
        where: {
           id_articulo: req.params.id 
          }
        });
    res.json("Article suspended");
  } catch (err){
    res.json(err);
  }
}

module.exports = articleController;