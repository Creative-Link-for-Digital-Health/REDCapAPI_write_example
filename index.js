const express = require('express')
const app = express()
const port = process.env.PORT || 3333

app.get('/testing', (req, res) => {
  res.json({"test":"success"})
})

app.get('/trigger', (req, res) => {
  res.json({"test":"success"})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})