const jwt = require('jsonwebtoken')
const Schema = require('../routes/Schemas/schemas')



module.exports = {
  authenticate : (req, res, next) => {

    if(req.headers.authorization){
      const token = req.headers.authorization.split(" ")[1]


      jwt.verify(token, 'timetravellingninja', (err, decoded) => {
        if(err){
          res.locals.authenticated = false
          res.locals.message = "Invalid Token"
          next()
        }
        else{

          Schema.User.findOne({username : decoded.username})
          .then(data => {

            if(!data){
              res.locals.authenticated = false
              res.locals.message = "User does not exist"
              next()
            }
            else{
              res.locals.authenticated = true
              res.locals.username = data.username
              res.locals.token = token
              res.locals.message = "Authentication success"
              next()
            }
          })

        }
      })
    }
    else{
      res.locals.authenticated = false
      res.locals.message = "Token missing from Authentication header"
      next()
    }
  }
}
