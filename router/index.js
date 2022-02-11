const express = require('express');
const router = express.Router();
const db = require('../config/db');
const conn = db.init();
db.connect(conn);

router.get('/' , (req, res) => {
    res.render('vote')
})

router.get("/vote" , async(req , res) => {

    try{
        let voteData

        let voteList = "";
            voteList += "select concat(round(( sum(vote)/100 * 100 ) , 0) , '%') as percentage, "
            voteList += "sum(people) as people , "
            voteList += "sum(vote) as vote , "
            voteList += "name as name "
            voteList += "from exampleVote where name in ('이재명' , '윤석열')  group by name "   

            let params = [];
            await conn.query(voteList , params , async (err , data) => {
                if(err) console.log("Error" , err)
                voteData = await data

                console.log("voteData" , voteData)

                res.render('index' , {voteData})
            })
      
    }catch(err){
        console.error("Error" , err)
    }
})


router.post('/insertVote' , async(req , res) => {
    console.log(req.body)
    let result = {}
    let {age , people , vote , name} = req.body
    let msg = "fail"
    let statusCode
    try{    
        
        let insertSql = "";
        insertSql += "insert into exampleVote (people , name , age , vote) values(? , ? , ? , ?) "
        const params = [people , name ,age  , vote];
        await conn.query(insertSql , params , (err , data) => {
            if(err) console.log(err);

            if(data){
                result = {
                    msg : "success",
                    statusCode : 200
                }

                res.send(result)
            }
        })

    }catch(err){    
        console.error('Err' , err)
    }
})




module.exports = router;

