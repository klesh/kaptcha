var kaptcha = require('../kaptcha.js');
var should = require('should');

describe('kaptcha functionalities test', function() {
  it('kaptcha.generateCode', function() {
    var code1 = kaptcha.generateCode();
    var code2 = kaptcha.generateCode();
    var code3 = kaptcha.generateCode();
    code1.should.be.ok();
    code1.length.should.be.exactly(6);
    code1.should.match(/^\d+$/);
    code2.should.be.ok();
    code2.length.should.be.exactly(6);
    code3.should.be.ok();
    code3.length.should.be.exactly(6);
  });

  it('kaptcha.generateImage', function(done) {
    var req = { session: {} };
    var res = { 
      end: function(buff) {
        buff.should.be.ok();
        buff.length.should.be.greaterThan(100);
        done();
      } 
    };
    kaptcha.generateImage(req, res, { width: 100, height: 30, text: '123456' });
  });
});
