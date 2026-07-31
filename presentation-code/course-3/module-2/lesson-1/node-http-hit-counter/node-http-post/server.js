const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let url = req.url;

    if (url === "/") {
        url = "index.html";
    }

    // Serve files from the 'sample-static-page' directory
    const filePath = path.join(__dirname, 'sample-static-page', url);

    if (req.method === 'POST' && req.url === '/submit') {
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const contentType = req.headers['content-type'];
            const boundary = contentType.split('; boundary=')[1];
            
            if (!boundary) {
                res.writeHead(400);
                res.end('Bad Request: Missing boundary');
                return;
            }

            const parts = buffer.toString('binary').split('--' + boundary);
            const formData = {};
            let fileName = '';

            for (const part of parts) {
                if (part.includes('Content-Disposition: form-data')) {
                    const [header, content] = part.split('\r\n\r\n');
                    const nameMatch = header.match(/name="([^"]+)"/);
                    if (nameMatch) {
                        const name = nameMatch[1];
                        if (header.includes('filename="')) {
                             const fileNameMatch = header.match(/filename="([^"]+)"/);
                             if (fileNameMatch) {
                                 fileName = fileNameMatch[1];
                                 // Content is the file data. Removing trailing newlines/dashes from split
                                 const fileContent = content.substring(0, content.length - 2); 
                                 const savePath = path.join(__dirname, 'uploads', fileName);
                                 fs.writeFileSync(savePath, fileContent, 'binary');
                             }
                        } else {
                            // Text field
                            formData[name] = content.substring(0, content.length - 2); // Remove trailing \r\n
                        }
                    }
                }
            }

            const { message, email, subject } = formData;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h1>Received Data</h1>
                <p><strong>Message:</strong> ${message}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                ${fileName ? `<h2>Uploaded Image:</h2><img src="/uploads/${fileName}" style="max-width:300px;">` : ''}
                <br><br>
                <a href="/">Go Back</a>
            `);
        });
        return;
    }

    // Serve files from uploads directory
    if (url.startsWith('/uploads/')) {
        const uploadPath = path.join(__dirname, url);
        fs.readFile(uploadPath, (err, content) => {
             if (err) {
                res.writeHead(404);
                res.end('Not Found');
             } else {
                 const ext = path.extname(uploadPath);
                 let type = 'image/jpeg'; // default fall back
                 if (ext === '.png') type = 'image/png';
                 res.writeHead(200, {'Content-Type': type});
                 res.end(content);
             }
        });
        return;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('404 (Not Found)');
        } else {
            res.writeHead(200, { 'Content-Type': getContentType(filePath) });
            res.end(content);
        }
    });
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
});

function getContentType(filePath) {
    const ext = path.extname(filePath);
    
    let contentType = 'text/html';
    if (ext === '.css') {
        contentType = 'text/css';
    } else if (ext === '.js') {
        contentType = 'text/javascript';
    } else if (ext === '.jpg') {
        contentType = 'image/jpg';
    }
    return contentType;
}
