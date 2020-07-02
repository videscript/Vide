"use strict";
// HTTP Module for Creating Server and Serving Static Files Using Node.js
// Static Files: HTML, CSS, JS, Images
// Get Complete Source Code from Pabbly.com
var http = require("http");
var fs = require("fs");
var path = require("path");
http.createServer(function (req, res) {
    const path = req.url;
}).listen(8080);
