const express = require('express');
const app = express();
const port = 3000;
const messagesRouter = require('./routes/messages');

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', messagesRouter);

app.listen(port, () => {
  console.log(`TMWSD is listening at http://localhost:${port}`)
})
