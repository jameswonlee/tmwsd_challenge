const express = require('express');
const router = express.Router();
const db = require('../db/db');

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = Buffer.from('8d423df62c407c302a11663b875dba166547fbec316645e940260856436348dd', 'hex');
const iv = crypto.randomBytes(16);

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);


// Encrypt data using Crypto
function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};
}

// Decrypt data using Crypto
function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}


// Queries all messages (currenty only being used to retreive length of messages array - does not require decrypt)
router.get('/', function (req, res) {
  db.all('SELECT * FROM messages', (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('messages/index', { messages: rows, dayjs: dayjs });
  })
})

// Creates an encrypted message
router.post('/create', (req, res) => {
  const { iv, encryptedData } = encrypt(req.body.message);
  const sql = 'INSERT INTO messages (message, iv, timestamp) VALUES (?, ?, ?)';
  const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const params = [encryptedData, iv, timestamp];

  db.run(sql, params, (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect('/');
  })
});

// Queries single message, decrypes, and then deletes from database
router.get('/message/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM messages WHERE id = (?)'

  db.get(sql, [id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    const decryptedMessage = decrypt({ iv: row.iv, encryptedData: row.message });
    console.log('decrypetdMessage', decryptedMessage);
    res.render('messages/show', { message: decryptedMessage, timestamp: row.timestamp, dayjs: dayjs });
    
    // Backup delete route in case user navigates away from page before setTimeout function executes
    db.run('DELETE FROM messages WHERE id = (?)', [id], (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Message with id: ${id} deleted from database`);
    })
  })
})

// Deletes message from database when setTimeout function is called (and executed)
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
