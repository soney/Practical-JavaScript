const request = require('request');
const fs = require('fs');
const path = require('path');

const formData = {
    message: 'Hello from client script!',
    email: 'client@example.com',
    subject: 'Test Subject',
    image: fs.createReadStream(path.join(__dirname, 'test-image.jpg')),
};

request.post({
    url: 'http://localhost:3000/submit',
    formData: formData,
}, (err, httpResponse, body) => {
    if (err) {
        return console.error('Upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
});
