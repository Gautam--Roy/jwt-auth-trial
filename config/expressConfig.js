const apiRouter = require('../routes/api')
const logger  = require('morgan')
const bodyParser = require('body-parser')

module.exports = (app) => {


  app.use(logger('dev'))
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  })




  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use('/api', apiRouter)
  
  app.use('/*', (req, res) => {
    res.send({
      Status : "Invalid Route",
      Message : "Please use the defined routes only"
    })
  })



  app.listen(3000, () => {
    console.log(`Server Running on ${App.port}, and running version number : ${App.version}`);
  })

}
