const express = require('express')
const app = express()
const port = 3001

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'database-1.cznaqk2d6avr.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
    getNotifications()
    .then(response => {
      res.status(200).send(response.rows);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


const getNotifications = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM notifications', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results);
      })
    }) 
  }