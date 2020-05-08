const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article-controller');

router.get('articles', articleController.getAll);

module.exports = router;