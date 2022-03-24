const express = require('express');
const path = require('path');
const hbs = require('hbs')
const app = express();

const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');



//define port
const env = require('dotenv');
env.config();
const PORT = process.env.PORT || 3000;


//configure static public directory
const publicdirpath = path.join(__dirname, '../public');
app.use(express.static(publicdirpath));

//config partials
hbs.registerPartials(path.join(__dirname,'../templates/partials'));

//view engin setup
app.set('views', path.join(__dirname,'../templates/views'));
app.set('view engine', 'hbs');



app.get('/', function(req, res){
    res.render('index', {
        title:'Weather App',       
       message: 'successfully loaded'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:'About',
        message:'successfully loaded '
    } )
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Help',
        message:'successfully loaded '
    } )
});

app.get('/weather',(req,res)=>{
   
    console.log(req.query.address);


    if(!req.query.address){
        res.send({
            error:"Please provide an address"
        })
    }


    geocode(req.query.address,(error, {longitude,latitude,placename}={})=>{
        if(error){
            res.send({error});
        
        }
         forcast(longitude, latitude, (error,forcastdata)=>{
            if(error){
                res.send({error})
            }
            forcastdata.location = placename;
            res.send(forcastdata);
        }) 

        
    });
});

app.get('/help/*',(req,res)=>{
    res.send('help article not found');
})

app.get('*',(req,res)=>{
    //res.send('my 404 page');
    res.render('404',{
        title:'404',
        message:'Page not Found'
    })
})


app.listen(PORT,()=>{
    console.log("server running on port " +PORT);
})