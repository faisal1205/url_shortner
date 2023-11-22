// models/url.js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiryDate: { type: Date,  },
    title: { type: String },
    description: { type: String },
    status: { type: String, enum: ['active', 'expired', 'deleted'], default: 'active' },
    visitors: [{
        ip: String,
        timestamp: { type: Date, default: Date.now },
        referer: {
            type: String, // Add the referer field
        },
    }]
});

module.exports = mongoose.model('Url', urlSchema);
