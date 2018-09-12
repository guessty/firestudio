#!/usr/bin/env node
"use strict";

var path = require('path'); //


var devServer = require('./../lib/dev-server');

module.exports = devServer(path.resolve('.'));