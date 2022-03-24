const request = require('request');

const geocode= (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoicm1udGl3YXJpIiwiYSI6ImNsMDk2ejE0ZjA2bGYzb3A1YmFsczFqbWcifQ.Z0tSGK55pCnKrL-_-Hmtbg';
    
   // request({url:url,json:true},(error, response)=>{
    request({url,json:true},(error, {body})=>{ //using shorthand reature of url and destructring of response
      

        if(error){
          
            callback('Unable to connect to server',undefined);
            return;

        }
        else if(body.message){
           
            callback(body.message,undefined);
        }
        else{
            
            
             if(body.features.length > 0){

                const latlong=body.features[0].center;
                const data = {
                longitude:latlong[0],
                latitude:latlong[1],
                placename: body.features[0].place_name
                }

                callback(undefined,data);

            }       
           
            
        }
    })

}

module.exports = geocode;