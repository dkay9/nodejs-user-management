const { default: mongoose } = require('mongoose')
const momgoose = require('mongoose')
mongoose.set('strictQuery', false)
const connectDB = async() => {
    try {
        const conn = await momgoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB