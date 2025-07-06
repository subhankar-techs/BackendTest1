
const express = require('express');

const userRouter = express.Router();

const con = require("../db");

userRouter.get("/all",(req,res)=>{
    var SQL="select * from products";  
    con.query(SQL,(error,userData,field)=>{
        if(error) res.status(403).json(error);
        else {
            res.status(200).json(userData);
        }
    });

})

userRouter.get("/:id",(req,res)=>{
      let userId = req.params.id;
      var SQL =`select * from products where product_id='${userId}'`;
      con.query(SQL,(error,userData,field)=>{
          if(error) res.status(403).json(error);
          else {
            if(!userData[0]){
                res.status(403).json({"message":"no such product found!"});
            }else{
              res.status(200).json(userData[0]);
            }
          }
      })
})


userRouter.post("/add",(req,res)=>{
        var SQL =`insert into products(product_id,name,price,stock)
                  values('${Math.floor(Math.random()*100)}',
                         '${req.body.name}',
                         '${req.body.price}',
                         '${req.body.stock}'
                  )       ;

        `
        con.query(SQL,(error,userData,field)=>{
              if(error) res.status(403).json({"message":error});
              else{
                 // res.status(200).json(todoData);
                   var message = (userData.affectedRows==1) ? "user_insert_success" : "user_insert_error";
                   res.status(200).json({"message":message});
                   
                }
        })
})


//update a user depends on user_id
userRouter.put("/update/:product_id",(req,res)=>{
     let productId = req.params.product_id;
     var SQL =`update products set name   ='${req.body.name}',
                                price  ='${req.body.price}',
                                stock  ='${req.body.stock}'
                                where product_id='${productId}'
                                `;
      con.query(SQL,(error,userData,field)=>{
        if(error) res.status(403).json(error);
        else{
            //res.status(200).json(userData);
            if(userData.affectedRows==1){
                res.status(200).json({"message":"user_update_success"});
            }else{
                res.status(403).json({"message":"user_update_error"});
            }
          }
      })
    })
      //delete request
userRouter.delete("/delete/:product_id",(req,res)=>{
          let productId = req.params.product_id;
          var SQL=`delete from products where product_id='${productId}'`;
          con.query(SQL,(error,userData,field)=>{
            if(error) res.status(200).json({"message":error});
            else {
                if(userData.affectedRows==1){
                  res.status(200).json({"message":"user_delete_success"});
                }else{
                  res.status(403).json({"message":"user_delete_error"});
                }
            }
          })
        });

module.exports = userRouter;
console.log("UserRouter is working");