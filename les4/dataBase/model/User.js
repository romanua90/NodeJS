const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true });

userSchema.virtual('full_name').get(function() { return `${this.first_name} ${this.last_name}`; });

module.exports = model('User', userSchema);
