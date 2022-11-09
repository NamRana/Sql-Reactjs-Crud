import express from 'express';
import mysql from 'mysql';

const app=express();

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"test",
})

app.get("/",(req,res)=>{
    res.json("Hello thi is backend!");
})

app.get("/books",(req,res)=>{
    const q="SELECT * FROM books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.post("/books",(req,res)=>{
    const q="INSERT INTO books VALUES books(`title`,`desc`,`price`,`cover`)VALUES(?)";

    const values=[
        req.body.title,
        req.body.title,
        req.body.price,
        req.body.cover
    ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.send(err);
        return res.json(data);
    });
});

app.delete("/books/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="DELETE FROM books WHERE id=?";

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.send(err);
        return res.json(data);
    });
});

app.put("/books/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="UPDATE books SET `title`=?, `desc`=?,`price`=?,`cover`=? WHERE ID=?";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.send(err);
        return res.json(data);
    });
});

app.listen(8000,()=>{
    console.log("Connected to backend");
})