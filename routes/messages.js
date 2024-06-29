const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/', function (req, res) {
  res.render('messages/index', { adjective: 'here' })
})



router.post('/create', (req, res) => {
  const message = req.body.content;
})

module.exports = router
