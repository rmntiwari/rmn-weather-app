const request = require('request');
const chalk = require('chalk');

const forcast=(longitude , latitude,  callback)=>{
    
    const url = 'http://api.weatherstack.com/current?access_key=e443e7e936a70345f877fed1ed95859a&query='+latitude+ ',' +longitude;
   
    request({url:url, json:true},(error, response)=>{
        
        if(error){
            callback('unable to connect to weather service', undefined)

        }    
        else if(response.body.error){
                
            callback("something went wrong",undefined);
            
        } 
        else{
            
        const weatherdata = response.body.current; 
           
            callback(undefined, weatherdata);
        }

    })

}

module.exports = forcast;