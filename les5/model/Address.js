const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
    land: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: Number, required: true },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

addressSchema.virtual('full_address').get(function() {
    return `${this.land}, ${this.region} region, ${this.city} town, ${this.street} street, ${this.number}`;
});

module.exports = model('Address', addressSchema);
