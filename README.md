# kaptcha
simple 6 digit captcha image middleware for express, modified from captcha middleware

## Installation
Canvas is required, please follow canvas instruction to install canvase dependencies. [Canvas Wiki](https://www.npmjs.com/package/canvas)

Once canvas is installed successfully, run npm command to install kaptcha.
```
npm install kaptcha
```

## Usage
As middleware (express-session middleware is required):
```
var kaptcha = require('kaptcha');

app.get('/kaptcha.png', kaptcha({ 
  color: 'rgb(0, 0, 0)', 
  background: 'rgb(255, 255, 255)',
  width: 100, 
  height: 30 
}))

app.post('/authenticate', function(req, res) {
  console.log(req.session.captcha == req.body.captcha);
})
```
Customize:
```
var kaptcha = require('kaptcha');

app.get('/captcha', function(req, res) {
  var code = kaptcha.generateCode();
  kaptcha.generateImage(req, res, { width: 100, height: 30, text: code });
})
```

## Parameters

### color
font color

### background
background color

### width
image width

### height
image height

### text
Optional captcha random code for generateImage(), and will be ignored in kaptcha middleware function.
