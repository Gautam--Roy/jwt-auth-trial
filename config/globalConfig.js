const packageJson = require('../package.json')
const PORT = process.env.PORT || 3000

global.App = {
  version: packageJson.version,
  port: PORT
}
