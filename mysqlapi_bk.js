const express = require('express');
const mysql   = require('mysql');
const bodyparser = require('body-parser');



const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, 'image-' + Date.now() + '.' + file.originalname);
    }
});
const upload = multer({storage: storage});

const app = express();
app.use(bodyparser.json());
// app.use(cors);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

    
const con = mysql.createConnection({
         host: 'localhost',
         user: 'root',
         password: 'sai@123',
         database: 'nodemysql',
        //  multipleStatements: true
});

con.connect((error, response) => {
    if(error){
        console.warn('Connection Failed!'+ JSON.stringify(error));
    }
    else{
        console.log('database connected...');
    }
});

//upload image
app.post('/uploadimg',upload.single('pic'),function(req, res, next) {
    console.log(req.file);
    if(!req.file) {
      res.status(500);
      return next(err);
    }
    res.json({ fileUrl: 'http://localhost:3000/images/' + req.file.filename });
  })



// -----> select all
app.get('/posts', (request,response) => {
    let fileUrl = 'http://localhost:3000/images/';
    let sql = `select * from posts`;

    con.query(sql, (error, result, field) => {
        if(error){
            console.warn(error);
        }
        else{
            response.send(result);
        }
    });
});


// -----> select single id
app.get('/posts/:id', (request,response) => {
    let sql = `select * from posts where id = ${request.params.id}`;
    con.query(sql, (error,result, fields) => {
        if(error){
            console.warn(error);
        }
        else{
            response.send(result[0]);
        }
    });
});

// -----> create data
app.post('/createpost',upload.single('pic'), (request,response) => {
    let sql = "insert into posts (title, body, pic) values(?,?,?)";
    let params = [request.body.title,request.body.body,request.file.filename];
console.log(request.file.filename);
    con.query(sql,params,(error,result,fields)=> {
        if(error){
            console.warn(error);
        }
        else{
            response.send('inserted successfully...');
        }
    });
});

// -----> update data
app.post('/updatepost/:id', (request,response) => {
    let sql = `update  posts set title =?, body =? where id=${request.params.id}`;
    let params = [request.body.title,request.body.body];

    con.query(sql,params,(error,result,fields)=> {
        if(error){
            console.warn(error);
        }
        else{
            response.send('updated successfully...');
        }
    });
});


// -----> delete data
app.delete('/deletepost/:id', (request,response) => {
    let sql = `delete from posts where id=${request.params.id}`;

    con.query(sql,(error,result,fields)=> {
        if(error){
            console.warn(error);
        }
        else{
            response.send('deleted successfully...');
        }
    });
});


app.listen(4001);


// {
//     "title":"title 3",
//     "body":"body 3"
//     }