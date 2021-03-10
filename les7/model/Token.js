const { Schema, model } = require('mongoose');
const { USER, TOKEN } = require('../constant/dataBaseSchema.enum');

const tokenSchema = new Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    _user_id: { type: Schema.Types.ObjectId, ref: USER },
}, { timestamps: true });

module.exports = model(TOKEN, tokenSchema);
