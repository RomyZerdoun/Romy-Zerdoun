const sql = require("./db");
const path = require("path");
const csv = require("csvtojson");

const createDb = (req, res) => {
    createUsersTable(req, res);
    createSellerTable(req, res);
    createItemTable(req, res);

    InsertUsersData(req, res);
    InsertSellerData(req, res);
    InsertItemData(req, res);

    res.status(200).send({message: 'tables created successfully'});
};

const dropDb = (req, res) => {
    deleteTableUsers(req, res);
    deleteTableSeller(req, res);
    deleteTableItems(req, res);

    res.status(200).send({message: 'tables dropped successfully'});
};


//------------------------------tables Users-----------------
//create tables Users
const createUsersTable = (req,res)=>{
    var Q11 = "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, email varchar(255) not null, name VARCHAR(255) not null, address VARCHAR(255) not null, phone_number VARCHAR(255) not null, password varchar(25) not null) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
    sql.query(Q11,(err,mysqlres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating users table"});
            return;
        }
        console.log('users table created successfully');
        return;
    })
};

//insert data into tables Users
const InsertUsersData = (req,res)=>{
    var Q12 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "users.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewUserEntry = {
            "email": element.email,
            "name": element.name,
            "address": element.address,
            "phone_number": element.phone_number,
            "password": element.password
        }
        sql.query(Q12, NewUserEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting user data", err);
                return;
            }
            console.log("created user row sucssefuly");
        });
    });
        console.log("The data has been successfully inserted into users table");
        return;
    });
};

//read data into tables Users
const readUsersTable = (req, res) => {
    var Q13 = "SELECT * FROM users";
    sql.query(Q13, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in reading users table"});
            return;
        }
        console.log('users table read successfully');
        res.send(mysqlres);
        return;
    });
};

//delete data into tables Users
const deleteUser = (req, res) => {
    var Q14 = "DELETE FROM users WHERE email = ?";
    var email = req.params.email;
    sql.query(Q14, [email], (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in deleting user"});
            return;
        }
        console.log('user deleted successfully');
        res.send({message: 'user deleted successfully'});
        return;
    });
};

//Update data into tables Users
const updateUser = (req, res) => {
    const { email, name, password, address } = req.body;
    var Q15 = `UPDATE users SET name = "${name}", password = "${password}", address = "${address}" WHERE email = "${email}"`;
    sql.query(Q15, (err, mysqlres) => {
      if (err) {
        console.log("error ", err);
        res.status(400).send({ message: "error in updating user data" });
        return;
      }
      console.log("user data updated successfully");
      res.send({ message: "user data updated successfully" });
      return;
    });
  };

  //Delete table Users not !!!!!!
const deleteTableUsers = (req, res) => {
    var Q54 = "DELETE FROM users";
    sql.query(Q54, (err, mysqlRes) => {
        if (err) {
        console.log("error", err);
        res.status(400).send({ message: "error in deleting users" });
        return;
        }
        console.log("users deleted successfully");
        return;
        });
}

//------------------------------tables sellers-----------------

//create tables seller 
const createSellerTable = (req,res)=>{
    var Q51 = "CREATE TABLE IF NOT EXISTS sellers (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, seller_email varchar(255) not null, seller_id INT not null not null, store_name VARCHAR(255) not null, seller_name VARCHAR(255) not null, description TEXT not null, rating INT not null, image_id VARCHAR(200) not null) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
    sql.query(Q51,(err,mysqlres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating sellers table"});
            return;
        }
        console.log('sellers table created successfully');
        return;
    })
};

//insert data into seller  tables
const InsertSellerData = (req,res)=>{
    var Q52 = "INSERT INTO sellers SET ?";
    const csvFilePath= path.join(__dirname, "sellers.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewSellerEntry = {
            "seller_email": element.seller_email,
            "seller_id": element.seller_id,
            "store_name": element.store_name,
            "seller_name": element.seller_name,
            "description": element.description,
            "rating": element.rating,
            "image_id": element.image_id,
        }
        sql.query(Q52, NewSellerEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting sellers data", err);
                return;
            }
            console.log("created sellers row sucssefuly");
        });
    });
        console.log("The data has been successfully inserted into sellers table");
        return;
    });
};

//Read all seller data
const readSellersTable = (req, res) => {
    var Q53 = "SELECT * FROM sellers";
    sql.query(Q53, (err, mysqlres) => {
    if (err) {
        console.log("error", err);
        res.status(400).send({ message: "error in reading all sellers data" });
    return;
    }
    console.log("all sellers data read successfully");
    res.send(mysqlres);
    return;
    });
    };
    
//Delete a seller
const deleteSeller = (req, res) => {
    var sellerEmail = req.params.seller_email;
    var Q54 = "DELETE FROM sellers WHERE seller_email = '" + {sellerEmail} +"'";
    sql.query(Q54, (err, mysqlRes) => {
    if (err) {
    console.log("error", err);
    res.status(400).send({ message: "error in deleting seller data" });
    return;
    }
    console.log("seller deleted successfully");
    res.send({ message: "seller deleted successfully" });
    return;
    });
};

//Update data into tables Seller
const updateSeller = (req, res) => {
    const { seller_email, seller_id, store_name, seller_name, description, rating, image_id } = req.body;
    var Q15 = `UPDATE sellers SET seller_email = "${seller_email}", store_name = "${store_name}", seller_name = "${seller_name}", description = "${description}", rating = "${rating}", image_id = "${image_id}" WHERE seller_id = "${seller_id}"`;
    sql.query(Q15, (err, mysqlres) => {
      if (err) {
        console.log("error ", err);
        res.status(400).send({ message: "error in updating user data" });
        return;
      }
      console.log("user data updated successfully");
      res.send({ message: "user data updated successfully" });
      return;
    });
  };

//Delete table seller nott!
const deleteTableSeller = (req, res) => {
    var Q54 = "DELETE FROM sellers";
    sql.query(Q54, (err, mysqlRes) => {
        if (err) {
        console.log("error", err);
        res.status(400).send({ message: "error in deleting seller data" });
        return;
        }
        console.log("seller deleted successfully");
        return;
        });
}


//------------------------------tables items-----------------

//create tables items
const createItemTable = (req,res)=>{
    var Q21 = "CREATE TABLE IF NOT EXISTS items (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, item_id varchar(255), item_name VARCHAR(255) not null, store_name VARCHAR(255) not null, seller_id INT not null not null, rating INT not null, description TEXT not null, price FLOAT not null, image_id VARCHAR(255), review TEXT, quantity_left INT not null, category VARCHAR(255) not null, exclusive VARCHAR(255) not null) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
    sql.query(Q21,(err,mysqlres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating items table"});
            return;
        }
        console.log('items table created successfully');
        return;
    })
};

//insert data into items tables
const InsertItemData = (req,res)=>{
    var Q22 = "INSERT INTO items SET ?";
    const csvFilePath= path.join(__dirname, "items.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewItemEntry = {
            "item_id": element.item_id,
            "item_name": element.item_name, 
            "store_name": element.store_name,
            "seller_id": element.seller_id,
            "rating": element.rating,
            "description": element.description,
            "price": element.price,
            "image_id": element.image_id,
            "review": element.review,
            "quantity_left": element.quantity_left,
            "category": element.category,
            "exclusive": element.exclusive
        }
        sql.query(Q22, NewItemEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting items data", err);
                return;
            }
            console.log("created items row sucssefuly");
        });
    });
        console.log("The data has been successfully inserted into items table");
        return;
    });
};

//read data into items tables
const readItemsTable = (req, res) => {
    var Q23 = "SELECT * FROM items";
    sql.query(Q23, (err, mysqlRes) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in reading items table"});
            return;
        }
        console.log('items table read successfully');
        res.send(mysqlRes);
        return;
    });
};

//deletes data into items tables
const deleteItem = (req, res) => {
    var Q24 = "DELETE FROM items WHERE item_id = ?";
    var itemId = req.params.item_id;
    sql.query(Q24, [itemId], (err, mysqlRes) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in deleting item"});
            return;
        }
        console.log('item deleted successfully');
        res.send({message: 'item deleted successfully'});
        return;
    });
};

//Update data into tables items
const updateItem = (req, res) => {
    const { item_id, item_name, store_name, seller_id, rating, description, price, image_id, review, quantity_left, category, exclusive } = req.body;
    var query = `UPDATE items 
                 SET item_name = "${item_name}", 
                     store_name = "${store_name}", 
                     rating = "${rating}", 
                     description = "${description}", 
                     price = "${price}", 
                     image_id = "${image_id}", 
                     review = "${review}", 
                     quantity_left = "${quantity_left}", 
                     category = "${category}", 
                     exclusive = "${exclusive}" 
                 WHERE item_id = "${item_id}"`;
    sql.query(query, (err, mysqlRes) => {
        if (err) {
            console.log("error", err);
            res.status(400).send({ message: "Error in updating the item" });
            return;
        }
        console.log("item updated successfully");
        res.send("item updated successfully");
        return;
    });
};

const deleteTableItems = (req, res) => {
    var Q54 = "DELETE FROM items";
    sql.query(Q54, (err, mysqlRes) => {
        if (err) {
        console.log("error", err);
        res.status(400).send({ message: "error in deleting items table" });
        return;
        }
        console.log("items deleted successfully");
        return;
        });
}

module.exports={
    createDb,
    dropDb,

    readUsersTable,
    readSellersTable,
    readItemsTable,

    deleteUser,
    deleteSeller,
    deleteItem,
    
    updateUser,
    updateSeller,
    updateItem,
};