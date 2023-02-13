//all the modules
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const CRUD = require("./db/CRUD");
const CRUDdb = require("./db/CRUDdb");
const port = 3000;

app.use(express.static(path.join(__dirname,'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(__dirname + "/views"));
app.use("/views", express.static(__dirname + "views"));
app.use("/static", express.static(__dirname + "/static"));
app.use("/js", express.static(__dirname + "/static/js"));
app.use("/css", express.static(__dirname + "/static/css"));
app.use("/images", express.static(__dirname + "/static/images"));

// ROUTES

app.get('/createDb', CRUDdb.createDb);
app.get('/dropDb', CRUDdb.dropDb);

app.get('/readUsersTable', CRUDdb.readUsersTable);
app.get('/readSellersTable', CRUDdb.readSellersTable);
app.get('/readItemsTable', CRUDdb.readItemsTable);

app.delete('/deleteUser', CRUDdb.deleteUser);
app.delete('/deleteSeller', CRUDdb.deleteSeller);
app.delete('/deleteItem', CRUDdb.deleteItem);

app.put('/updateUser', CRUDdb.updateUser);
app.put('/updateSeller', CRUDdb.updateSeller);
app.put('/updateItem', CRUDdb.updateItem);

app.post('/login', CRUD.findUser);
app.post("/register", CRUD.register_user);
app.get('/storeData/:seller_id', CRUD.store_data);
app.get('/sellers', CRUD.list_seller);
app.get('/sellers/:id', CRUD.list_seller);
app.get('/items', CRUD.itemCH);
app.get('/items/:id', CRUD.itemCH);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});