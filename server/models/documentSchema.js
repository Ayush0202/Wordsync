const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    userId: {
        type: String,
        required: true
    }
})

const document = mongoose.model('document', documentSchema)

module.exports = document