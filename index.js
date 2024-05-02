const express = require('express')
const app = express()

const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid')


const port = process.env.PORT || 3333


const GenerateTestREDCapAPIPostData = () => {

  let send_data = '[{"record_id":"'+ uuidv1() + '", "user_id":"1234B"}]'
  
  post_data = {
    'token': 'C1A72302B7004CAC79A1769811ED0429',
    'content': 'record',
    'action': 'import',
    'format': 'json',
    'type': 'flat',
    'overwriteBehavior': 'normal',
    'forceAutoNumber': 'false',
    'data': send_data ,
    'returnContent': 'count',
    'returnFormat': 'json'
  }

  return 
}

app.get('/ping', (req, res) => {
  res.json({"ping":"success"})
})

app.get('/write', (req, res) => {

  console.log(GenerateTestREDCapAPIPostData())

  res.json({"test":"success"})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})