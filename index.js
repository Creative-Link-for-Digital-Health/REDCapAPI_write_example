const express = require('express')
const app = express()
const port = 3333

app.get('/testing', (req, res) => {
  res.json({"test":"success"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})