# kaptcha
simple 6 digit captcha image middleware for express, modified from captcha middleware

## Installation
Canvas is required, please follow canvas instruction to install canvase dependencies. [Canvas Wiki](https://www.npmjs.com/package/canvas)

Once canvas is installed successfully, run npm command to install kaptcha.
```
npm install kaptcha
```

## Usage
Mount kaptcha middleware:
```
var kaptcha = require('kaptcha');

app.use(kaptcha({ 
  url: '/kaptcha.jpg', 
  color: 'rgb(0, 0, 0)', 
  background: 'rgb(255, 255, 255)',
  width: 100, 
  height: 30, 
  save: function(code) { 
    console.log(code); 
  }  
}));
```

## Parameters

### url
url to render captcha image.

### color
font color

### background
background color

### width
image width

### height
image height

### save
Optional callback to receive generated random digit, or kaptcha will try to save it to req.session.captcha .
