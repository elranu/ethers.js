'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var convert_1 = require("./convert");
var utf8_1 = require("./utf8");
var keccak256_1 = require("./keccak256");
var Zeros = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var Partition = new RegExp("^((.*)\\.)?([^.]+)$");
var UseSTD3ASCIIRules = new RegExp("^[a-z0-9.-]*$");
function namehash(name) {
    name = name.toLowerCase();
    // Supporting the full UTF-8 space requires additional (and large)
    // libraries, so for now we simply do not support them.
    // It should be fairly easy in the future to support systems with
    // String.normalize, but that is future work.
    if (!name.match(UseSTD3ASCIIRules)) {
        throw new Error('contains invalid UseSTD3ASCIIRules characters');
    }
    var result = Zeros;
    while (name.length) {
        var partition = name.match(Partition);
        var label = utf8_1.toUtf8Bytes(partition[3]);
        result = keccak256_1.keccak256(convert_1.concat([result, keccak256_1.keccak256(label)]));
        name = partition[2] || '';
    }
    return convert_1.hexlify(result);
}
exports.namehash = namehash;