var should = require("should");
var DeltaCalculator = require("../../www/js/shared/DeltaCalculator.js");

function mockAsync(callback) {
    callback();
}

module.exports.MTO_FPD = (function() {
    ////////////////// constructor
    function MTO_FPD(options) {
        var that = this;
        options = options || {};
        that.delta = options.delta || DeltaCalculator.createLooseCanonRAMPS();
        return that;
    }
    MTO_FPD.prototype.calcPulses = function(xyz) {
        var that = this;
        return that.delta.calcPulses(xyz);
    }
    MTO_FPD.prototype.calcXYZ = function(pulses) {
        var that = this;
        var xyz = that.delta.calcXYZ(pulses);
        return {
            x: math.round(xyz.x,3),
            y: math.round(xyz.y,3),
            z: math.round(xyz.z,3),
        };
    }

    return MTO_FPD;
})();

// mocha -R min --inline-diffs *.js
(typeof describe === 'function') && describe("MTO_FPD", function() {
    var MTO_FPD = exports.MTO_FPD;
    it("TESTTESTMTO_FPD should calcPulses({x:1,y:2,z:3.485}", function() {
        var mto = new MTO_FPD();
        var xyz = {x:1,y:2,z:3.485};
        should.deepEqual(mto.calcPulses(xyz), {
            p1: -141,
            p2: -232,
            p3: -191,
        });
    })
    it("TESTTESTMTO_FPD should calcXYZ({x:1,y:2,z:3.485}", function() {
        var mto = new MTO_FPD();
        var pulses = {p1:-141,p2:-232,p3:-191};
        should.deepEqual(mto.calcXYZ(pulses), {
            x: 1.006,
            y: 1.997,
            z: 3.486,
        });
    })
})