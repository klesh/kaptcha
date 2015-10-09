var Canvas = require('canvas');

function generateCode() {
  return ('' + Math.random()).substr(3, 6);
}

function generateImage(req, res, params) {
  params.color = params.color || 'rgb(0, 0, 0)';
  params.background = params.background || 'rgb(255, 255, 255)';
  params.width = params.width || 250;
  params.height = params.height || 150;
  params.innerWidth = params.width * 0.6;
  params.fontHeight = params.height *  0.6;
  params.offset = params.width * 0.08;
  params.fontWidth = Math.ceil(params.fontHeight / 2);

  var offset = params.width * 0.4 * Math.random();

  var canvas = new Canvas(params.width, params.height);
  var ctx = canvas.getContext('2d');
  ctx.antialias = 'gray';
  ctx.fillStyle = params.background;
  ctx.fillRect(0, 0, params.width, params.height);
  ctx.fillStyle = params.color;
  ctx.lineWidth = params.fontHeight / 10;
  ctx.strokeStyle = params.color;
  ctx.font = params.fontHeight + 'px sans';

  for (var i = 0; i < 2; i++) {
    ctx.moveTo(offset, Math.random() * params.innerWidth);
    ctx.bezierCurveTo(
        params.width * 0.32,
        Math.random() * params.height, 
        params.width * 0.64,
        Math.random() * params.height, 
        params.width * 0.92,
        Math.random() * params.height);
    ctx.stroke();
  }

  var text = params.text || generateCode();

  for (i = 0; i < text.length; i++) {
    ctx.setTransform(Math.random() * 0.5 + 1, Math.random() * 0.4, Math.random() * 0.4, Math.random() * 0.5 + 1, params.fontWidth * i + offset, params.height * 2 / 3);
    ctx.fillText(text.charAt(i), 0, 0);
  }

  canvas.toBuffer(function(err, buf) {
    if(req.session)
      req.session.captcha = text;
    res.end(buf);
  });
}


module.exports = function(params){
  if (params.hasOwnProperty('text'))
    delete params.text;

	return function(req, res, next){
    generateImage(req, res, params);
	};
};

module.exports.generateImage = generateImage;
module.exports.generateCode = generateCode;
