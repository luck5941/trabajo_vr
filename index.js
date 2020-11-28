#!/usr/bin/env nodejs

const http = require('http');
const url = require('url');
const fs = require('fs');
const mime = require('mime-types')

http.createServer((req, res) => {
	let q = url.parse(req.url);
	q.pathname = q.pathname == "/" ? "public/index.html" : "public/" + q.pathname;
	fs.readFile(q.pathname, (err, data) => {
		console.log(q.pathname);
		if (err)  {
			res.writeHead(404, {"Content-Type": "text/html"});
			res.end("404 Not found");
		}
		else {
			res.writeHead(200, {"Content-Type": mime.lookup(q.pathname)});
			res.write(data);
			res.end();
		}
	});

}).listen(8080);

