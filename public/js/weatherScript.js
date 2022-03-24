


const button = document.querySelector('button');
const message1 = document.querySelector('#loading');
const message2 = document.querySelector('#forcantinfo');

message1.textContent="Data from weather api";
message2.textContent="";


button.addEventListener('click', (e)=>{

    e.preventDefault();
    message1.textContent="loading...";
    message2.textContent="";

    const searchtext = document.querySelector('input[type="text"]').value;
    if(searchtext !=''){
        
        fetch("/weather/?address=" + searchtext).then((response)=>{

            response.json().then((data)=>{

                if(data.error){
                    console.log(data.error);
                }
                else{
                    let location = data.location;
                    let forcast = "current temprature is " + data.temperature + " degree centegrate and feels like " + data.feelslike+ " and  chances of rain is " + data.cloudcover + " percent";
                    console.log(data);
                    message1.textContent=location;
                    message2.textContent=forcast;
                }

            });

        });

    }
})
