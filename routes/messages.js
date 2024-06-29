const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Queries all messages
router.get('/', function (req, res) {
  // res.render('messages/index', { adjective: 'here' })
  db.all('SELECT * FROM messages', (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('messages/index', { messages: rows });
  })
})

// Queries single message
router.get('/message/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT message FROM messages WHERE id = ?', [id], (err, row) => {
    if (err) {
      return console.error(err.message, 'here');
    }
    res.render('messages/show', { message: row });
  })
})




// router.post('/create', (req, res) => {
//   const message = req.body.content;
// });

module.exports = router
