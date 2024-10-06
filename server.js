const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// constants
const PORT = 3005

// middleware
app.use(express.json())
app.use(cors())

// routes
const userRoute = require('./src/routes/User')
const itemRoute = require('./src/routes/Item')

// app.use(itemRoute)
app.use(itemRoute)
app.use(userRoute)

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log('server running on port', PORT)
})