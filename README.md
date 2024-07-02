![message-incinerator-logo]

[message-incinerator-logo]: ./public/logo.svg


# About
Message Incinerator is a full-stack web application designed to provide a secure and temporary means of storing messages. Users can create, save, and view messages that self-destruct after a single view. Each message is encrypted to safeguard your data. The application also includes a dark mode/light mode toggle for improved usability and a countdown timer that indicates when a message will self-destruct.

## ▶️ Getting started

1. Clone repository.
```
https://github.com/jameswonlee/tmwsd_challenge.git
```
2. Install dependencies

```
npm install
``` 
3. Start application - This will create your SQLite3 database
```
npm start | node app.js
```

## Features

- [✔] As a user, I should see a form to create a new message on the homepage.
- [✔] As a user, I should see a list of links for all created messages below the 'new message' form on the homepage.
- [✔] As a user, when I click a link in the message list, I should be able to view the message at a unique URL.
- [✔] As a user, when I open a message, the message should self-destruct (delete from the database).
- [✔] As a user, I should no longer see messages on the homepage that have been viewed.

## Desktop demo



## Mobile demo