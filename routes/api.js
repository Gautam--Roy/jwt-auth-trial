const Router = require('express').Router()
const Schema = require('./Schemas/schemas')
const jwt = require('jsonwebtoken')
const Authenticate  = require('../middleware/authentication')
Router.get('/', (req, res) => {
  res.send({
    Message : "Response from API root"
  })

})


Router.post('/signup', Authenticate.authenticate, (req, res) => {


  if(res.locals.authenticated === true){
    res.send({
      Status : "Authenticated",
      Message : {
        token : res.locals.token,
        username : res.locals.username,
        redirect : true
      }
    })
    return
  }


  if(!req.body.username || req.body.username === '' || !req.body.password || req.body.password === ''){
    res.send({
      Status : "Error",
      Message : "Invalid Input"
    })

    return
  }

  const token = jwt.sign({
    username : req.body.username,
  }, "timetravellingninja")

  const User = new Schema.User({
    username : req.body.username,
    password : req.body.password,
    token : token
  })

  User.save((err, data) => {
    if(err){
      if(err.code === 11000){
        res.send({
          Status : "Error",
          Message : "Please use another username. The provided username already exists"
        })
      }else{
        res.send({
          Status : "Error",
          Message : err
        })
      }
    }else{
      res.send({
        Status : "Success",
        Message : data
      })
    }
  })
})

Router.post('/login', Authenticate.authenticate, (req, res) => {

  if(res.locals.authenticated === true){
    res.send({
      Status : "Authenticated",
      Message : {
        token : res.locals.token,
        username : res.locals.username,
        redirect : true
      }
    })
    return
  }



  if(!req.body.username || req.body.username === '' || !req.body.password || req.body.password === ''){
    res.send({
      Status : "Error",
      Message : "Invalid Input"
    })
    return
  }


  Schema.User.findOne({username : req.body.username})
  .then(data => {

    if(!data){
      res.send({
        Status : "User invalid",
        Message : "Username does not exist"
      })
      return
    }


    if(data.password !== req.body.password){
      res.send({
        Status : "Invalid Creds",
        Message : "Provided password in incorrect"
      })
    }
    else{
      res.send({
        Status : "Authenticated",
        Message : data.token
      })
    }
  })

})

Router.post('/dash', Authenticate.authenticate, (req, res) => {

    if(res.locals.authenticated === true){
      res.send({
        Status : "Authenticated",
        Message : {
          token : res.locals.token,
          username : res.locals.username
        }
      })
    }
    else{
      res.send({
        Status : "Authentication Failed",
        Message : "Token Missing"
      })
    }
})




module.exports = Router
