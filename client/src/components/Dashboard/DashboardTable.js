import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

// material ui
import { Table, TableHead, TableBody, TableCell, TableRow, styled, Button} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// api
import { getAllDocuments, deleteDocument } from "../../services/api"
import {useAuthContext} from "../../hooks/useAuthContext"

// styles for table

const TableContainer = styled('div')`
  width: 100%;
  overflow-x: auto;
`

const Container = styled(Table)`
  width: 70%;
  margin: 50px auto 0 auto;
`

const THead = styled(TableRow)`
    background: #fff;
    & > th {
        color: #111;
        font-size: 20px;
    }
`

const TBody = styled(TableRow)`
    & > td {
        font-size: 15px
    }
`

const DashboardTable = () => {

    const {user} = useAuthContext()

    // document state
    const [documents, setDocuments] = useState([])

    // showing alert
    const [errorMessage, setErrorMessage] = useState('')

    // getting all documents
    useEffect(() => {
        if(user) {
            getAllSavedDocuments(user.token)
        }
    }, [user])

    const getAllSavedDocuments = async (token) => {
        try {
            const response = await getAllDocuments(token)
            setDocuments(response)
        }
        catch (e) {
            console.log(e)
        }
    }

    // deleting saved document
    const deleteSavedDocument = async (id) => {
        try {
            const authToken = user.token
            const response = await deleteDocument(id, authToken)
            console.log(response)
            if(response.message === 'Document deleted successfully') {
                setErrorMessage('Document deleted successfully')
            }
            getAllSavedDocuments(authToken)
        }
        catch (e) {
            console.log(e)
        }
    }

    // closing alert
    const handleAlertClose = () => {
        setErrorMessage('')
    }

    return (
        <>
            {/* alert message */}
            {errorMessage && (
                <Alert severity="success" onClose={handleAlertClose} >
                    <AlertTitle>Success</AlertTitle>
                    {errorMessage}
                </Alert>
            )}

            <h1 className='dashboard-heading'>Your Documents</h1>

            {/* dashboard */}

            <TableContainer>
                <Container>
                    <TableHead>
                        <THead>
                            <TableCell>Document Link</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Syntax</TableCell>
                            <TableCell>Actions</TableCell>
                        </THead>
                    </TableHead>

                    <TableBody>
                        {documents && documents.length > 0 ? ( // ? operator
                            documents.map((document) => (
                                <TBody key={document._id}>
                                    <TableCell>
                                        <Link to={`/docs/${document._id}`} style={{ textDecoration: 'none' }}>
                                            {document._id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{new Date(document.createdAt).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell>{new Date(document.createdAt).toLocaleTimeString()}</TableCell>
                                    <TableCell>Plain Text</TableCell>
                                    <TableCell>
                                        <Button variant='' onClick={() => deleteSavedDocument(document._id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TBody>
                            ))
                        ) : ( // : operator
                            <TBody>
                                <TableCell colSpan={5}  style={{
                                    textAlign: 'center',
                                    fontFamily: 'monospace',
                                    fontWeight: 'bolder',
                                    fontSize: '20px'
                                }}>
                                    No Documents Found
                                </TableCell>
                            </TBody>
                        )}
                    </TableBody>

                </Container>
            </TableContainer>

        </>
    )
}

export default DashboardTable