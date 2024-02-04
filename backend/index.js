import express from "express";
import mysql from "mysql2";
import cors from "cors";



const app = express();

app.use(express.json({limit:"16kb"}));
app.use(cors());


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Mysql#45411admin",
    database:"ebook_store"
});

db.connect(function(err) {
    if (err) {
        console.error("error in connecting to mysql" + err.stack);
        return;
    }
    console.log("Connected on " + db.threadId);
    db.query("USE ebook_store;", function (err) {
      if (err) {
        console.error("error in using the database" + err.stack );
      }
      console.log("using the database!");
    });
  });

app.get("/", (req,res)=>{
    res.send("<h1>Main page of backend (ebook store)</h1>")
})

app.get("/books/getbooks", (req,res)=>{
    

    const q = "select * from books;";
    db.query(q,(err,data)=>{
        if(err) throw err;
        res.json(data);
    })
})

app.post("/books/addbook",async (req,res)=>{

    const q = "INSERT INTO `books` (`name`,`description`,`price`) VALUES (?);";

    let priceInNumber = Number(req.body.price);
    let values=[req.body.name, req.body.description,priceInNumber];
    
    // const data = await req.body;
    // const {name, description,price} = data;
    
    

    // console.log(`${typeof(name)} and ${typeof(description)} and ${typeof(priceInNumber)}`);

    // res.send(data);
   

    db.query(q, [ values ],(err,data)=>{
        if(err) throw err;
        res.json("book has been created");
    })

})


app.delete("/books/deletebook/:id", async(req,res)=>{
    let bookToDelete = req.params.id;
    // let values = [bookToDelete];
    let q = "DELETE FROM `books` WHERE `book_id` = ? ;" ;
    db.query(q,bookToDelete,(err,data)=>{
        if(err) throw err;
        res.json("book has been deleted!");
    })
})



app.get("/books/updatebook/preData/:id",(req,res)=>{
    let id = req.params.id;
    let value = [id];

    db.query("select name,description,price from books where book_id = ?",value,(err,data)=>{
        if(err){
            console.error("error in sending data of given id");
            return;
        }
        res.send(data);
        console.log("specific data has been sended!");
    })
})



app.get("/books/updatebook/:id", (req,res)=>{
   
    let selectedBook = req.params.id;
   

    // let value = [name,description,price,selectedBook];
    // console.log(value);

    db.query("SELECT * FROM `books` WHERE `book_id` = ? ;",selectedBook,(err,data)=>{
        if (err) {
            console.error("Got a error in sending updating field data !" + err.stack);
            return;
        }
    res.json(data);
    })})



app.put("/books/updatebook/:id", (req,res)=>{
   
    let selectedBook = req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let price = Number(req.body.price);

    let value = [name,description,price,selectedBook];
    // console.log(value);

    // db.query("SELECT * FROM `books` WHERE `book_id` = ? ;",selectedBook,(err,data)=>{
    //     if (err) {
    //         console.error("Got a error in sending updating field data !" + err.stack);
    //         return;
    //     }
    // res.json(data);
    // })

    db.query("UPDATE books SET name = ?, description = ?, price = ? WHERE book_id = ? ",[name,description,price,selectedBook],(err,data)=>{
        if(err) {
            console.log("eror in updating the data " + err.stack);
            return;
        }

        console.log("data updated!");
    })


    
})

app.listen(4000,()=>{
    console.log(`server working on port 4000`);
})

