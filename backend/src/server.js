const app = require('./app.js');
const connectDB = require('./db/db.js')
const dotenv = require('dotenv');
dotenv.config()

const port = process.env.port || 3000 ;
 


connectDB();

app.listen(port,() => {
    console.log(`server is listen on port: ${port}`)

})