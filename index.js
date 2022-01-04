const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const unless = require('express-unless');
const app = express();

// ກວດຊອບການເຊື່ອມຕໍ່ ກັບ MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    ()=>{
        console.log('DataBase connected');
    },
    (error) => {
        console.log("Data Base can't be connect: " + error)
    }
);

// ກວດຊອບ path login
auth.authenticateToken.unless = unless;

app.use(
    auth.authenticateToken.unless({
        path: [
            {url: "/users/login", methods: ["POST"]},
            {url: "/users/register", methods: ["POST"]},
        ],
    })
);

// ທຳການ Run Server
app.use(express.json());

// ທຳການ Routing ໂດຍໃຊ້ Path ຫຼັກເປັນ users ຕົວຢ່າງການໃຊ້: /users/login
app.use("/users",require("./routes/users.routes"));
app.use(errors.errorHandler);
app.listen(process.env.port || 4000, function(){
    console.log("Ready to Go!");
});