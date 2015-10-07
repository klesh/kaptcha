var Canvas = require('canvas');

module.exports = function(params){
  if(typeof params == 'string')
      params = { url: params };
  params.color = params.color || 'rgb(0,100,100)';
  params.background = params.background || 'rgb(255,200,150)';
  params.width = params.width || 250;
  params.height = params.height || 150;
  params.innerWidth = params.width * 0.6;
  params.fontHeight = params.height *  0.6;
  params.offset = params.width * 0.08;
  params.fontWidth = Math.ceil(params.fontHeight / 2);

	return function(req, res, next){
		if(req.url != params.url)
			return next();

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
          //params.width * 0.24 + offset, 
          params.width * 0.32,
          Math.random() * params.height, 
          params.width * 0.64,
          //params.width * 0.58 + offset, 
          Math.random() * params.height, 
          params.width * 0.92,
          //params.width * 0.86 + offset, 
          Math.random() * params.height);
			ctx.stroke();
		}

		var text = ('' + Math.random()).substr(3, 6);

		for (i = 0; i < text.length; i++) {
			ctx.setTransform(Math.random() * 0.5 + 1, Math.random() * 0.4, Math.random() * 0.4, Math.random() * 0.5 + 1, params.fontWidth * i + offset, params.height * 2 / 3);
			ctx.fillText(text.charAt(i), 0, 0);
		}

//	    ctx.setTransform(1, 0, 0, 1, 0, 0);
//	    ctx.font = '25px sans';
//	    ctx.fillStyle = "rgb(255,255,255)";
//	    ctx.fillText(text, 70, 145);

		canvas.toBuffer(function(err, buf) {
      if (params.save)
        params.save(text);
      else if(req.session)
        req.session.captcha = text;
			res.end(buf);
		});
	};
};
