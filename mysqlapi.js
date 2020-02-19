const express = require('express');
const mysql   = require('mysql');
const bodyparser = require('body-parser');
const uuidv4 = require('uuid/v4');
const path = require('path');
const multer  = require('multer');


 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
         const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });
 const upload = multer({ storage });

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
         password: '',
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
      return next();
    }
    res.json({ fileUrl: 'http://localhost:3000/images/' + req.file.filename });
  })



// -----> select all
app.get('/posts', (request,response) => {
    // let fileUrl = 'http://localhost:3000/images/';
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



//user registration
// app.post('/register', (request, response) => {
//     let sql = "insert into users (name, email, password) values(?,?,?)";
//     let params = [request.body.name,request.body.email,request.body.password];

//     con.query(sql,params,(error,result,fields)=> {
       
//         if(error){
//             console.warn(error);
//         }
//         else{
//             response.send('inserted successfully...');
//         }
//     });
// })   


app.post('/register', (request, response) => {
    let check = `select count(email) as email  from users where email =  '${request.body.email}'`
    con.query(check, (error,result, field) => {
       
    let data = Object.values(result[0]);
    
    if(data > 0){
        response.send({'status':'fail!', 'message' : 'record already exists'});
    }
    else{
        let sql = "insert into users (name, email, password) values(?,?,?)";
        let params = [request.body.name,request.body.email,request.body.password];
        con.query(sql,params,(error,result,fields)=> {
            if(error){  
                console.warn(error);
            }
            else{
                response.send({'status':'success!', 'message' : 'record inserted successfully'});
            }
        });
        
    }
         
    })
})

 
app.post('/login', (request, response) => {
    let check = `select count(email) as email  from users where email =  '${request.body.email}' `
    con.query(check, (error,result, field) => {
       
    let data = Object.values(result[0]);
    if(data[0] > 0){
    
        let userData = `select * from users where email='${request.body.email}' and password=${request.body.password}`;
        con.query(userData, (errors, results, fields) => {
            response.send({'status':'success!', 'message' : 'login successful!','userData':results[0]});
        })
    }
    else{
        response.send({'status':'fail!', 'message' : 'invalid details'});
    }
         
    })
})

app.listen(4001); 
  
 
// {
//     "title":"title 3",
//     "body":"body 3"
//     }