const express = require("express");
const ejs = require('ejs');
const app = express();
const path = require('path');
const home = require('./router')
//mysql 연결
const db = require('./config/db')
const conn = db.init();
db.connect(conn)


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , 'public')))

app.set('view engine' , 'ejs');
app.set('views' , './views')

app.use('/' , home)

const port = process.env.PORT || 3000;


app.listen(port , () => {
    console.log(`${port}포트 포트로 이동중....`)
})