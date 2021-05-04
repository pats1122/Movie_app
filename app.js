const express = require('express')
const request = require('request')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
app.set("view engine", "ejs")
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/dummy', (req, res) => {
    res.render('dummy')
})

app.get('/result', (req,res) => {
    //console.log('req.query')
    //res.send(`You have searched for ${req.query.movie_name}`)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movie_name}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body)
            //res.send(data)
            res.render('result',{moviesdump:data})
        } else {
            res.send("Something went wrong")
        }
    })
})
app.get('/result/:id', (req, res) => {
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body)
            //res.send(data)
            res.render('details',{moviedetails:data})
        } else {
            res.send("Something went wrong")
        }
    })
})

//for error
app.get("*", (req, res) => {
    res.send("404 Server Error")
})
app.listen(3000, () => {
    console.log('Server has started')
})