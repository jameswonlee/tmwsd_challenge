const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Queries all messages
router.get('/', function (req, res) {
  // res.render('messages/index', { adjective: 'here' })
  db.all("SELECT * FROM messages", (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render({ messages: rows });
  })
})

// Queries single message
router.get('/')

// router.post()



router.post('/create', (req, res) => {
  const message = req.body.content;
});

module.exports = router
