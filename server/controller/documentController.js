const Document = require('../models/documentSchema')


// getting all documents of a user and showing them to the dashboard page
const getAllDocuments = async (req, res) => {
    const userId = req.user._id
    try {
        const document = await Document.find({userId: userId}).sort({ createdAt: -1 })
        res.status(200).json(document)
    }
    catch (e) {
        res.status(404).json({message: e.message})
    }
}


// getting a particular document
const getDocument = async (docId, userId) => {

    try {
        if(docId === null) {
            return
        }

        const document = await Document.findById(docId)

        if(document) {
            return document
        }

        return await Document.create({_id: docId, data: "", userId: userId})

    }
    catch (e) {
            console.log(e)
    }
}


// updating document
const updateDocument = async (docId, data) => {
    return await Document.findByIdAndUpdate(docId, {data})
}


// deleting document
const deleteDocument = async (req, res) => {
    try {
        // deleting document based on doc id
        await Document.deleteOne({_id: req.params.id})
        // document delete successfully
        return res.status(200).json({message: 'Document deleted successfully'})
    }
    catch (e) {
        return res.status(401).json({message: e.message})
    }
}


module.exports = { getAllDocuments, getDocument, updateDocument, deleteDocument }