![Logo](logo.png)

[![License](https://img.shields.io/github/license/adilek/jirtdan.svg)](https://github.com/adilek/jirtdan/blob/master/LICENSE) [![Build Status](https://travis-ci.org/adilek/jirtdan.svg?branch=master)](https://travis-ci.org/adilek/jirtdan) 
======



[Jirtdan project](http://jirtdan.org) is an engine for modelling and simulation of a logical circuits using logical gates.

The engine is written in pure JavaScript using ECMA 2015 dialect. Can be run on any supported browser.

## Installation

The application is using some AJAX requests internally, due to that reason it is recommended to use any web server.

You may use any http server software ([Apache HTTP Server](https://httpd.apache.org/), [lighttpd](https://www.lighttpd.net/), [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en) etc.) to launch jirtdan project successfully.

Copy the contents of this repository into certain directory of web server, navigate to `http://hostname/<directory>/app/app.html`.

If you have Docker installed in your machine jump to `Run via Docker` section

## Demo

You can see the current demo [here](http://jirtdan.org/app/app.html).

## Bug reporting and wish-list
If you have a bug or a feature to request, please create an issue ticket on [https://github.com/adilek/jirtdan/issues](https://github.com/adilek/jirtdan/issues).

## Run via Docker
The easiest way to run Jirtdan in your local machine is via Docker. If you have Docker installed in your machine do following:

```
$ cd jirtdan
$ sudo docker build -t jirtdan .
$ sudo docker run -p 8080:80 jirtdan
```

Now open `127.0.0.1:8080/app.html` in your browser to see the app running


## Copyright and license

Licensed under the **MIT** (https://github.com/adilek/jirtdan/blob/master/LICENSE) license.

Logo is by Ismayil Hasanli

## TODO
We decided to use Trello boards to track the TODO list.
It is publicly available to view and can be accessed on [https://trello.com/b/gezzFCOU/jirtdan-engine](https://trello.com/b/gezzFCOU/jirtdan-engine).

