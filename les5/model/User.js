const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String },
    _houses: [{ type: Schema.Types.ObjectId }]
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true });

userSchema.virtual('full_name').get(function() { return `${this.first_name} ${this.last_name}`; });

userSchema.virtual('houses', {
    ref: 'House',
    localField: '_houses',
    foreignField: '_id'
});

userSchema.pre('find', function() {
    this.populate('houses');
})
    .pre('findOne', function() {
        this.populate('houses');
    });

module.exports = model('User', userSchema);
