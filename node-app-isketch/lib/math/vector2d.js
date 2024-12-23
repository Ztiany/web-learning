"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector2D = void 0;
require("core-js/modules/es.math.hypot.js");
class Vector2D extends Array {
  constructor() {
    let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    super(x, y);
  }
  get x() {
    return this[0];
  }
  get y() {
    return this[1];
  }
  get len() {
    return Math.hypot(this.x, this.y);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
}
exports.Vector2D = Vector2D;