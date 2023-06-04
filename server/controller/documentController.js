const Document = require('../models/documentSchema')


// getting all documents of a user and showing them to the dashboard page
const getAllDocuments = async (req, res) => {
    try {
        const document = await Document.find({}).sort({ createdAt: -1 })
        res.status(200).json(document)
    }
    catch (e) {
        res.status(404).json({message: e.message})
    }
}


// getting a particular document
const getDocument = async (docId) => {

    try {
        if(docId === null) {
            return
        }

        const document = await Document.findById(docId)

        if(document) {
            return document
        }

        return await Document.create({_id: docId, data: ""})

    }
    catch (e) {
            console.log(e)
    }
}


// updating document
const updateDocument = async (docId, data) => {
    return await Document.findByIdAndUpdate(docId, {data})
}


module.exports = { getAllDocuments, getDocument, updateDocument }