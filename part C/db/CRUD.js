const sql = require("./db");

const findUser = (req, res)=>{
    if (!req.body) { 
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const { email, password } = req.body;
    sql.query("SELECT * FROM web.users WHERE `email` = '" + email + "' AND `password` = '" + password + "' LIMIT 1",
    function (err, data, fields) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (data?.length) {
            res.status(200).json({
                response: JSON.parse(JSON.stringify(data[0])),
            });
        }
        else {
            res.status(400).json({
                error: 'user was not found'
            })
        }
    });
};

const register_user = (req, res) =>{
    
    // Validate the user input
    const userData = {
    "name": req.body.name,
    "email": req.body.email,
    "address": req.body.address,
    "phone_number": req.body.phone,
    "password": req.body.password
    };
      
    if (!userData.email || !userData.name || !userData.password || !userData.address) {
        // If any of the required fields are missing, return an error
        res.status(500).json({ error: 'required fields are missing' });
        return;
    }
    
    // Check if the user already exists in the database
    sql.query(`SELECT * FROM users WHERE email = '${userData.email}'`, (err, mysqlRes) => {
        if (err) {
        console.log("Error: ", err);
        res.status(500).json({ error: err });
        return;
        }
    
        if (mysqlRes.length > 0) {
        // If the user already exists, return an error
        res.status(500).json({ error: 'User already exists with this email address!' });
        return;
        }
    
        // Insert the user data into the "users" table in the database
        sql.query("INSERT INTO users SET ?", userData, (err, mysqlRes) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).json({ error: err });
            return;
        }
        else {
            res.status(200).json({data: mysqlRes});
        }
        });
    });
    };

const list_seller = (req, res)=>{
    var Q53 = "SELECT * FROM sellers";
    if (req.params.id) {
        Q53 += ` WHERE id = ${req.params.id}`;
    }
    sql.query(Q53, function (err, data, fields) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({data});
        }
    });
};

const itemCH = (req, res) => {
    let itemP = `SELECT * FROM items`;

    if (req.params.id) {
        const item_id = req.params.id;
        itemP = `SELECT * FROM items WHERE item_id = '${item_id}'`;
    }
  
    sql.query(itemP, function (err, data, fields) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({data});
        }
    });
  };

const store_data = (req, res) => {
    let sqlD = `SELECT * FROM items`;
    if (req.params.seller_id) {
        sqlD += ` WHERE seller_id = '${req.params.seller_id}'`;
    }
    sql.query(sqlD, function (err, data, fields) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({data});
        }
    });
}; 


module.exports={findUser,register_user,list_seller,itemCH,store_data};