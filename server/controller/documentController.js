const Document = require('../models/documentSchema')


// getting all documents of a user and showing them to the dashboard page
const getAllDocuments = async (req, res) => {
    try {
        const document = await Document.find({})
        res.status(200).json(document)
    }
    catch (e) {
        res.status(404).json({message: e.message})
    }
}

module.exports = { getAllDocuments }