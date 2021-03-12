const { Schema, model } = require('mongoose');

const { dataBaseSchemaEnum: { HOUSE, ADDRESS } } = require('../constant');

const houseSchema = new Schema({
    area: { type: Number, required: true },
    price: { type: Number, required: true },
    year_builded: { type: Number, required: true },
    year_selled: { type: Number, required: true },
    _address: [{ type: Schema.Types.ObjectId }]
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

houseSchema.virtual('address', {
    ref: ADDRESS,
    localField: '_address',
    foreignField: '_id'
});

houseSchema.pre('find', function() {
    this.populate('address');
})
    .pre('findOne', function() {
        this.populate('address');
    });

module.exports = model(HOUSE, houseSchema);
