const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const db=require('./models')
const checkRequestField = (req, res, next) => {
    //validasi check data request

    if (req.query.username && req.query.password) {
        next()
    } else {
        return res.send('invalid username or password')
    }
}
const checkDataTypes = (req, res, next) => {
    
    const parseUsername = isNaN(parseInt(req.query.username))?"":parseInt(req.query.username)
    if (typeof parseUsername==='string' && typeof req.query.password==='string') {
        next();
    } else {
        res.send("invalid format username or password")
    }
};

const checkLogin = async (req, res, next) => {
    //dipanggil dulu data dari db
    const dataCheck = await db.users.findOne({
        where: { username: req.query.username, password: req.query.password },
    });
    if (dataCheck) {
        next();
    } else {
        res.send("invalid username or password")
    }
};

app.get('/',checkRequestField,checkDataTypes,checkLogin,(req, res) => {
        res.send('<h1>You are registered in users table</h1>');
});
//********************************************************************** */

const checkDataField = async (req, res, next) => {
    //dipanggil dulu data dari db
    if (req.body["username"] && req.body["password"] && req.body["age"] && req.body["email"]) {
        next()
    } else {
        return res.send('invalid username or password')
    }
};

const checkAgeTypes = async (req, res, next) => {
    
    const parseage = await Number.isNaN(parseInt(req.body["age"])) ? "" : parseInt(req.body["age"])
   
    if (typeof parseage==='number') {
        next();
    } else {
        res.send("invalid age data format")
    }
};

/**checkReqfilldata(kolomnya sesuai tidak), check datatype age sesuai tidak*/

app.post('/',checkDataField,checkAgeTypes, async(req, res) => {
    //insert new user database
    const newUserName = req.body["username"];
    const newPassword = req.body["password"];
    const newAge = req.body["age"];
    const newEmail=req.body["email"]
    await db.users.create({
        username: newUserName,
        password: newPassword,
        age: newAge,
        email:newEmail,
        createdAt: new Date(),
        updatedAt:new Date()
    })
    res.send('success insert new data')

})

app.listen(port, ()=>console.log(`this app run at http://localhost:${port}/`))