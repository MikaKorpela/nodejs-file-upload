const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/upload-avatar', (req, res) => {
    
    var responseObject;

    try {
        if(!req.files) {

            responseObject = {
                message: 'No file content'
            }
            
            res.send(responseObject);
            res.status(400).end();
        } else {

            let avatar = req.files.avatar;

            avatar.mv('./uploads/' + avatar.name);

            responseObject = {
                message: ' File uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            }
                
            res.send(responseObject);
            res.status(201).end();
        }
    } catch (err) {
        responseObject = {
            message: err
        }
        res.status(500).send(responseObject);
        res.send();
    }
});

//start app 
const port = process.env.PORT || 3000;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);