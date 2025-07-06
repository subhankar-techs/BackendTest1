//Testing the connection of mysql server & express
const mysql = require('mysql');
//Creating the connection string.
const con =mysql.createConnection({
           host:process.env.HOST,
           user:process.env.USER,
           password:process.env.PASS,
           database:process.env.DB
});

//Connecting to MYSQL Database
con.connect((error)=>{
      if(error) console.log(error);
      else {
        console.log("Successfully connected to MYSQL Database");
      }
})

module.exports = con;
console.log("MYSQL Global connection working");