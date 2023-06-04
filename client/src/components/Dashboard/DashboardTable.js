import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import { Table, TableHead, TableBody, TableCell, TableRow, styled, Button} from "@mui/material";

import { getAllDocuments} from "../../services/api";

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

    // document state
    const [documents, setDocuments] = useState([])

    // getting all documents
    useEffect(() => {
        getAllSavedDocuments()
    }, [])

    const getAllSavedDocuments = async () => {
        try {
            const response = await getAllDocuments()
            setDocuments(response)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>

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
                                        <Button variant=''>
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