const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 6565

const app = express()
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')))
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')))
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')))


app.listen(PORT, () => console.log("Client server is running on http://localhost:" + PORT))