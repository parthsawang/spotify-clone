require("dotenv").config();


const app = require('./app.js');
const connectDB = require('./db/db.js')



const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});