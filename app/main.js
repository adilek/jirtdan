let http = require('http');
let url = require('url');
let fs = require('fs');

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename = "app/." + q.pathname;
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }

        let mimeType = 'text/html';
        if (filename.endsWith(".css")) {
            mimeType = "text/css";
        } else if (filename.endsWith(".js")) {
            mimeType = "application/javascript";
        }

        res.writeHead(200, {'Content-Type': mimeType});
        res.write(data);
        return res.end();
    });
}).listen(8080);