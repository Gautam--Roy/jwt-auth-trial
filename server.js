require('./config/globalConfig')
require('./config/dbConfig')
require('./config/expressConfig')(require('express')())
