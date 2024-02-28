import  express  from "express";
import cors from 'cors'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import cookieParser from 'cookie-parser';
import mysql from 'mysql2'
import userRoutes from './routes/userRoutes.js'; 

const salt = 10; 

const app = express(); 
app.use(express.json()); 
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true
})); 
app.use(cookieParser()); 

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Mianboga2005",
    database: "db_godsplan"
})

app.get("/", (req, res) => {
    res.json("Hola este es el backend")
})




app.post('/register', (req, res) => {
    const sql = "INSERT INTO Users (`username`,`email`,`contact`,`password`) VALUES (?)"; 
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hassing password"}); 
        const values = [
            req.body.username,
            req.body.email,
            req.body.contact,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if(err) {
                console.error('error en la consulta SQL: ', err);
                return res.status(500).json({Error: "Inserting data Error in server"}); 
            }
            return res.status(200).json({Status: "Success"}); 
        })
    })

})

app.post('/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Credentials', 'true');
    const sql = 'SELECT * FROM Users WHERE email = ?'; 
    db.query(sql, [req.body.email], (err,data) => {
        if(err ) return res.json({Error: "Login error in server"});
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({Error: "Contraseña incorrecta"})
                if(response) {
                    const name = data[0].username; 
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'}); 
                    res.cookie('token', token); 
                    return res.json({Status: "Success"});
                } else {
                    return res.json({Error: "password not matched"});
                }
            })
        } else{
            return res.json({Error: "el email ingresado no existe"}); 
        }
    })
})

app.post('/addadmin', (req, res) => {
    const sql = "INSERT INTO Admins (`adminUser`,`adminPassword`) VALUES (?)"; 
    bcrypt.hash(req.body.adminPassword.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hassing password"}); 
        const values = [
            req.body.adminUser,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if(err) {
                console.error('error en la consulta SQL: ', err);
                return res.status(500).json({Error: "Inserting data Error in server"}); 
            }
            return res.status(200).json({Status: "Success"}); 
        })
    })

})

app.post('/admin', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Credentials', 'true');
    const sql = 'SELECT * FROM Admins WHERE adminUser = ?'; 
    db.query(sql, [req.body.adminUser], (err,data) => {
        if(err ) return res.json({Error: "Login error in server"});
        if(data.length > 0) {
            bcrypt.compare(req.body.adminPassword.toString(), data[0].adminPassword, (err, response) => {
                if (err) return res.json({Error: "Contraseña incorrecta"})
                if(response) {
                    const name = data[0].adminUser; 
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'}); 
                    res.cookie('token', token); 
                    return res.json({Status: "Success"});
                } else {
                    return res.json({Error: "password not matched"});
                }
            })
        } else{
            return res.json({Error: "el email ingresado no existe"}); 
        }
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

//PRODUCTS

app.get("/createproduct", (req, res) => {
    const q = "SELECT * FROM products"
    db.query(q,(err,data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/createproduct", (req, res) => {
    const q = "INSERT INTO products (`title`,`description`,`price`,`image`, `categories_id_categories`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.image,
        req.body.categories_id_categories
    ];
    db.query(q, [values], (err,data) => {
        if(err) return res.json(err)
        return res.json("el producto ha sido creado");
    })
})



app.use('/user', userRoutes);

app.listen(5000, () => {
    console.log("Server on port 5000.."); 
})


