const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode')

const app = express()

// use this instead of localhost =>'127.0.0.1'
const dirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(dirPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Nitin Kumar Pandey'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Nitin Kumar Pandey'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpText: 'This section provides help.',
        title: 'Help',
        name: 'Nitin Kumar Pandey'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.place){
        return res.send({
            error: 'Please enter the address'
        })
    }
    // console.log(req.query.place)
    geocode(req.query.place, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return console.log(error)
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

        res.send({
            address: location,
            forecast: forecastData
            })
        })
    })
    

})

app.get('/help/*', (req,res) =>{
    res.render('404page', {
        error: 'Help article',
        name: 'Nitin Kumar Pandey',
        title: '404'
    })
})


app.get('/about/*', (req,res) =>{
    res.render('404page',{
        error: 'About', 
        name: 'Nitin Kumar Pandey',
        title: '404'
    })
})

app.get('*', (req,res) =>{
    res.render('404page',{
        error: 'Page',
        name: 'Nitin Kumar Pandey',
        title: '404 page'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up and running')
})