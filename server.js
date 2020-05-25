const express = require('express')
const app = express()
const bodyParser = require('body-parser');


const PythonConnector = require('./PythonConnector.js');

const path=require("path");
app.use(express.static(path.join(__dirname,"public")));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/predict', async function (req, res) {

    console.log(req.body);
    console.log(req.body.text);
   

    let text=req.body.text;

    if(text){
        console.log('I am the user input...:'+ text);

    }
    
    try {
        const prediction = await PythonConnector.invoke('predict_from_img', text);
        if(prediction){
            console.log('I am the user prediction:  '+ prediction)
            return res.status(200).json({
                status:"Chatbot output",
                prediction
                                     })
        }
        
    }
    catch (e) {
        console.log(`error in ${req.url}`, e);
        res.sendStatus(404);
    }

})







app.get('/', (req, res) => {

    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['./hello.py']);

    pyProg.stdout.on('data', function(data) {

        console.log(data.toString());
        res.write(data);
        res.end('end');
    });
})
// console.log(process.env.PORT);
const port=process.env.PORT||4000;
app.listen(4000, () => console.log('Application listening on port 4000!'))