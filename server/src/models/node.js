const mongo = require('../mongo')

const nodeSchema = new mongo.Schema({ name: String, size: Number })

module.exports = mongo.model('Node', nodeSchema)
