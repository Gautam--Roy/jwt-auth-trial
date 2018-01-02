const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://localhost/UserAuthDB')



const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log(`Mongoose Connected`);
})
