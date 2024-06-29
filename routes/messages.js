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

  db.get('SELECT message FROM messages WHERE id = (?)', [id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('messages/show', { message: row });

    db.run('DELETE FROM messages WHERE id = (?)', [id], (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log(`Message with id: ${id} deleted from database`)
    })
  })
})

// Creates a message
router.post('/create', (req, res) => {
  const message = req.body.content;

  db.run('INSERT INTO messages (message) VALUES (?)', [message], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect('/');
  })
});

module.exports = router
