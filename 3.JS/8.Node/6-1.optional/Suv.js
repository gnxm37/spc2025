const Car = require('./Car');

class Suv extends Car {
    constructor(brand, model, color, trunkSize) {
        super(brand, model, color, trunkSize);
    }
}

module.exports = Suv;