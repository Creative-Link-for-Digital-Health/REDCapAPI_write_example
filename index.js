require('dotenv').config()
const axios = require('axios');
const express = require('express')
const app = express()
const {v1: uuidv1} = require('uuid')
const url = require('url')

const port = process.env.PORT || 3333


const GenerateTestREDCapAPIPostData = () => {

  let send_data = '[{"record_id":"'+ uuidv1() + '", "user_id":"Final Countdown"}]'
  
  post_data = {
    'token': process.env.REDCAP_API_KEY,
    'content': 'record',
    'action': 'import',
    'format': 'json',
    'type': 'flat',
    'overwriteBehavior': 'normal',
    'forceAutoNumber': 'false',
    'data': encodeURIComponent(send_data) ,
    'returnContent': 'count',
    'returnFormat': 'json'
  }

  return post_data
}

//console.log(GenerateTestREDCapAPIPostData()) 

// Have to build a custom url encoding because REDCap only accepts data as 'Content-Type': 'application/x-www-form-urlencoded' and various tools are trying to escape uri-ecoded chars
// i.e. hard to serialize data that is part uri encoded and part json :(

const BuildParams = (data_object) => {
  let stringified =""
  for (let key in data_object) {
    if (data_object.hasOwnProperty(key)) {
      stringified += `${key}=${data_object[key]}&`
    }
  } 

  return stringified.slice(0, -1)       //kill the last trailing &
}

console.log(BuildParams(GenerateTestREDCapAPIPostData()))




app.get('/ping', (req, res) => {
  res.json({"ping":"success"})
})

app.get('/test-write', (req, res) => {

  console.log("start write")

  const params = BuildParams(GenerateTestREDCapAPIPostData())

  console.log("built params")

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: params,
    url: process.env.REDCAP_API_ENDPOINT,
  }
  
  console.log("started the call to REDCap")

axios(options)
  .then(function (response) {
    res.json({"test":"success", "payload": response.data})
    // res.json({"test":"success"})
    // console.log(response);
  })
  .catch(function (error) {
    res.json({"test":"error", "payload": error})
    // console.log(error);
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})