
const express = require('express');
const orderRouter = express.Router();
const con = require("../db");

orderRouter.post("/", (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const SQL = `INSERT INTO orders (users_id, product_id, quantity) VALUES ('${user_id}', '${product_id}', '${quantity}')`;
    con.query(SQL, (error, result) => {
        if (error) return res.status(403).json({ message: error });
        res.status(200).json({ message: "order_insert_success", order_id: result.insertId });
    });
});

orderRouter.get("/", (req, res) => {
    const SQL = `SELECT * FROM orders`;
    con.query(SQL, (error, orders, field) => {
        if (error) return res.status(403).json(error);
        res.status(200).json(orders);
    });
});

orderRouter.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const SQL = `SELECT * FROM orders WHERE users_id='${userId}'`;
    con.query(SQL, (error, orders, field) => {
        if (error) return res.status(403).json(error);
        res.status(200).json(orders);
    });
});

orderRouter.delete("/:id", (req, res) => {
    const orderId = req.params.id;
    const SQL = `DELETE FROM orders WHERE order_id='${orderId}'`;
    con.query(SQL, (error, result, field) => {
        if (error) return res.status(403).json({ message: error });
        if (result.affectedRows === 1) {
            res.status(200).json({ message: "order_delete_success" });
        } else {
            res.status(403).json({ message: "order_delete_error" });
        }
    });
});

module.exports = orderRouter;
console.log("OrderRouter is working");
