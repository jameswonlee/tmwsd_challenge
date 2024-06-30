const express = require('express');
const router = express.Router();
const db = require('../db/db');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);


// Queries all messages
router.get('/', function (req, res) {
  // res.render('messages/index', { adjective: 'here' })
  db.all('SELECT * FROM messages', (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('messages/index', { messages: rows, dayjs: dayjs });
  })
})

// Creates a message
router.post('/create', (req, res) => {
  const message = req.body.content;

  db.run('INSERT INTO messages (message) VALUES (?)', [message], (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect('/');
  })
});

// Queries single message and then deletes from database
router.get('/message/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM messages WHERE id = (?)', [id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('messages/show', { message: row, dayjs: dayjs });
    
    // db.run('DELETE FROM messages WHERE id = (?)', [id], (err) => {
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   console.log(`Message with id: ${id} deleted from database`);
    // })
  })
})

// Deletes message from database
router.delete('/message/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM messages WHERE id = (?)', [id], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Message with id: ${id} deleted from database`);
    res.status(200).send('Message deleted');
  })
})

module.exports = router
