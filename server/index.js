const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const app = express();


const multer = require('multer');

//const { Server } = require("socket.io");
//const server = http.createServer(app);
const urldecode = require('urldecode')


const { S3Client } = require('@aws-sdk/client-s3');
    
const multerS3 = require('multer-s3');


var superid;

let s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: ${yourAPIKey},
    secretAccessKey: '${yourSecretApiKey}'
  },
 
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'orionbucket1',
    acl:'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        'math/' + Date.now().toString() + '-' + file.originalname
      );
    },
  }),
});
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE"],
    credentials: true,
  })
);





app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);




const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "alexa",
  database: "math",
  multipleStatements:true
});
app.post('/repository/addmaterial', upload.single('file'), (req, res, next) => {
  const name = req.body.name     
  const flow = req.body.flow
  const disc = req.body.disc
  const group = req.body.group
  const type = req.body.type
  const publish = req.body.publish
  const linki = req.body.linki
  var image;
  if (req.file){
   image = req.file.location

  }
  else{
    image=''
  }

  
  console.log("data", flow,disc,group,image,publish,linki)


 
  

     
  const q= `Select gid into @grid from groupi where gname = '${group}';insert into repository( grid,name, respository,link,author, discipline,type,publish) values (@grid,'${name}','${image}','${linki}','Глущенко Татьяна Александровна', '${disc}','${type}','${publish}')`




db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }
  return res.json(data);

});
})
app.post('/homework/add', upload.single('file'), (req, res, next) => {
  const name = req.body.name     
  const flow = req.body.flow
  const disc = req.body.disc
  const group = req.body.group
  const image = req.file.location
  const author = req.body.author
  const fio = req.body.fio


 
  

     
  const q= `Select gid into @grid from groupi where gname = '${group}';insert into dz(usid, usname, groid,hname, homework, teacher, discipline) values ('${author}','${fio}', @grid,'${name}','${image}','Глущенко Татьяна Александровна', '${disc}')`
  console.log(q)



db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }
  return res.json(data);

});
})
app.post('/admin', (req, res, next) => {
  const flow = req.body.flow
  const group = req.body.group
  const course = req.body.course
  const ackey = req.body.ackey


  

 
  

     
  const q= `insert into flows (coid,fname) values ('${course}','${flow}');
select fid into @fid from flows where fname = '${flow}';
insert into groupi (couid,flid,gname,kluch) values ('${course}', @fid, '${group}','${ackey}')`




db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }
  return res.json(data);

});
})

app.post('/homework/evaluation/:homework', upload.single('file'), (req, res, next) => {
  const h = req.params.homework
  var corrections;
  if (req.file){
      corrections = req.file.location 
  }
  else{
    corrections = ''
  }
  const mark = req.body.mark
  const comments = req.body.comments
  const proved = req.body.proved

  const check = true



 
  

     
  const q= `update dz set corrections = '${corrections}',checked = ${check},mark = '${mark}',comments = '${comments}', credit = '${proved}' where hid=${h}`




db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }
  return res.json(data);

});
})

app.get("/account/user/:id", (req, res) => {
  const id = req.params.id
  console.log(id)

  const q = `SELECT * from users where id = ${id}`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data)
    return res.json(data);
  });
});

app.get("/account/:userid", (req, res) => {
  const id = req.params.userid
  console.log(id)

  const q = `SELECT * from users, groupi,flows, courses where id = ${id}`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data)
    return res.json(data);
  });
});
app.post("/account/:userid", (req, res) => {
  const id = req.params.userid
  const flow=req.body.flow
  const group=req.body.group
  const username=req.body.username


  const email=req.body.email
  const course=req.body.course

  console.log(id)

  var q = `update users set  `;
 const conditionsArr = []; 
 if (email){
  conditionsArr.push(  `email='${email}'`);
 }

 if (group){
  conditionsArr.push(  `group='${group}'`);
 }


 if (flow){
      conditionsArr.push(  ` flow='${flow}'`);


 }
 if (course){
  conditionsArr.push(  ` course='${course}'`);


}
if (username){
  conditionsArr.push(  ` username='${username}'`);


}
 
q += conditionsArr.join(', '); 

q += ` WHERE id = ${id}`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data)
    return res.json(data);
  });
});
app.get('/repository/:myrepository', (req, res, next) => {    

  const m = req.query.myrepository
  console.log("m",m)
  const q=`Select gid into @gid from groupi where gname='${m}';  Select * from repository,groupi where  groupi.gid = repository.grid = @gid and author="Глущенко Татьяна Александровна"
  `
  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data[1]);

});
})


app.get('/repository/addmaterial', (req, res, next) => {    
  const id  = req.query.id
  console.log("id",id)
  console.log("get")
  const q='Select * from groupi'

  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err);
  }
  else{
    console.log("data",data)
    return res.json(data);
  }



});
})
app.get('/deadline/:alldeadline', (req, res, next) => {    

  const m = req.query.alldeadline
  const q=`Select * from repository, users, groupi where users.grouppa = groupi.gname and repository.grid = groupi.gid and groupi.gname='${m}'`

  db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})






app.post('/tests/:alltest', (req, res, next) => {    

  const m = req.params.alltest
  const discipline = req.body.disc

  var q=`Select * from repository, users, groupi where users.grouppa = groupi.gname and repository.grid = groupi.gid and groupi.gname="${m}" and repository.type="тест"`
  if (discipline){
    q+=` and repository.discipline = '${discipline}'`
  }
db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})
app.post('/repository/:myrepository', (req, res, next) => {    

  const m = req.params.myrepository

  const discipline = req.body.disc
  var q=`Select gid into @gid from groupi where gname='${m}';  Select * from repository,groupi where  groupi.gid = repository.grid = @gid and author="Глущенко Татьяна Александровна"`

  if (discipline){
    q+=` and repository.discipline = '${discipline}'`
  }
db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data[1]);

});
})

app.delete('/homework/:homework', (req, res, next) => {    

  const h = req.params.homework


   const q = `delete from dz where hid = ${h}`

  
 
db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

 return res.json("Component was deleted");

});
})

app.delete('/material/:material', (req, res, next) => {    

  const m = req.params.material


   const q = `delete from repository where rid = ${m}`

  
 
db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

 return res.json("Component was deleted");

});
})

app.post('/homework/:homework', (req, res, next) => {    

  const h = req.params.homework
  const discipline = req.body.disc
  var q;
 
    q=`Select * from dz, users where usid = ${h} and dz.usid = users.id`
    if (discipline){
      q+=` and dz.discipline = '${discipline}'`
    }

  

 
db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})

app.post('/homework/teacher/:allteacher', (req, res, next) => {    

  const h = req.params.allteacher
  const discipline = req.body.discipline
  const course = req.body.course
  const group = req.body.group
  console.log(discipline)
  var q = `Select * from dz, users,groupi where users.fio = dz.teacher and users.id=${h} and groupi.gid = dz.groid`

  if (discipline){
    q+=` and discipline = '${discipline}'`
  }
  if (course){ 
    q+=` and couid = ${course}`
  }
  if (group){
    q+=` and gname = '${group}'`
  }
console.log(q)

db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})
app.get('/repository/teacher/:all', (req, res, next) => {    
  const m = req.query.all
  console.log(m)
     
  const q=`Select * from repository,groupi where grid=gid`

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err)
      ;
    }

    return res.json(data);

  });
})
app.get('/signup', (req, res, next) => {    
 
     
  const q=`Select * from groupi,flows,courses where cid=coid and coid=couid and fid=flid`

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err)
      ;
    }

    return res.json(data);

  });
})


app.post('/repository/teacher/:all', (req, res, next) => {    

  const m = req.params.all
  const course = req.body.course
  const group = req.body.group

  const discipline = req.body.discipline
  const type = req.body.type


  console.log(m)
  console.log(course)
  console.log(group)
 
  console.log(discipline)

 
  

   
  var q=` Select repository.type, repository.rid, repository.author, repository.discipline, repository.publish,repository.respository, repository.name,groupi.gid, groupi.couid, groupi.gname , users.id, users.fio, repository.link from repository, users,groupi where users.fio = repository.author and users.id=${m} and repository.grid = groupi.gid`
  if (course){ 
    q+=` and groupi.couid = ${course}`
  }
  if (group){
    q+=` and groupi.gname = '${group}'`
  }
  if (discipline){
    q+=` and repository.discipline = '${discipline}'`
  }
  if (type){
    q+=` and repository.type = '${type}'`
  }
  



db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})
app.get('/homework/:homework', (req, res, next) => {    

  const h = req.params.homework
  console.log(h)
  

     
  const q=`Select * from dz, users where usid = ${h} and dz.usid = users.id`




db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})

app.get('/homework/teacher/:allteacher', (req, res, next) => {    

  const h = req.params.allteacher
  console.log(h)
  

     
  const q=` Select * from dz, users, groupi where users.id = ${h} and dz.teacher = users.fio and dz.groid=groupi.gid
  
  `




db.query(q, (err, data) => {
  if (err) {
    console.log(err);
    return res.json(err)
    ;
  }

  return res.json(data);

});
})

app.get("/account/user/:id", (req, res) => {
  const id = req.params.id
  console.log(id)

  const q = `SELECT * from users where id = ${id}`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data)
    return res.json(data);
  });
});
app.get("/account/:userid", (req, res) => {
  const id = req.params.userid
  console.log(id)

  const q = `SELECT * from  groupi, flows,courses where couid = coid=cid and flid=fid  `;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(data)
    return res.json(data);
  });
});

app.post('/login',function(req,res){
  const user_name = req.body.logusername;
  console.log(req.body.logusername);
  const user_password = req.body.logpassword;
  console.log(user_password);
  if(user_name && user_password)
  {
      query = `
      SELECT * FROM users
      WHERE username = "${user_name}"
      `;
      
      db.query(query, function(error, data){
        console.log(data)
        

          if(data.length > 0)
          {
          
                  if(data[0].password)
                  {
                    console.log(data[0].password, user_password)
               
                    
                    bcrypt.compare(user_password,data[0].password,function(err,result){
                    if (result){
                      /*console.log("jwt1")
                      const token = jwt.sign({id:data[0].id},"userId")
                      const {password, ...other} = data[0]
                      console.log(other)
                      console.log("jwt2")
                      return res.cookie("access_token",token,{
                        httpOnly:true,
                        credentials: "same-origin" 
                      }).status(200).json(other)*/
                     
                      const {password, ...other} = data[0] 
                      const token = jwt.sign(other, 'university', { expiresIn: "2h" });
                      console.log(token)
                      superid = token.sid
                      res.send(token);
                                    
                    

                    }
                   else if (err){
                    console.log("wrong password")
                    return res.sendStatus(401).json(err);
                    
                  
                   
                   }

                  });
                }
              }
              else{
                return res.status(401).json(error);
              }
          
           
              
            })
          
          }
        })
        
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const ackey = req.body.ackey;

  
  const email = req.body.email
  console.log(username)
  const fio = req.body.fio
  const course = req.body.course
  
  const flow = req.body.flow
  const grouppa  = req.body.group 
  console.log(password)
  console.log(email)
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      `select kluch from groupi where gname='${grouppa}' and kluch='${ackey}' `,
     
      (err, result) => {
        if (err){
          console.log(err)
        }
        else if (result.length>0 ){
          console.log(result)
         
          db.query(
            ` INSERT INTO users (username,email, password,flow,fio,grouppa,course) VALUES (?,?,?,?,?,?,?) 
            `,
            [username, email, hash,flow,fio,grouppa,course],
            (err, result) => {
              if (err){
                console.log(err)
              }
              else{

          
          const jwtData = {result};
    const token = jwt.sign(jwtData, 'CODEBLESSYOU', { expiresIn: "2h" });
    res.send(token);
        }
      })
      
      }
      else if (result.length==0){
        res.send(result)
        console.log(result)
      }
      }
    );
  });
 
});

app.listen(8800, () => {
  console.log("running server");
});
/*
var io = require("socket.io");


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
*/

