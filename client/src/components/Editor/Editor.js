import React, {useEffect, useState} from 'react'
import {io} from 'socket.io-client'
import {useParams, useNavigate } from "react-router-dom";

import {useAuthContext} from "../../hooks/useAuthContext"

import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import {Box} from '@mui/material'
import styled from '@emotion/styled'

import './Editor.css'
import Header from "../Header/Header";

const Component = styled.div`
  background: #F5F5F5;
`

// other options for editor component
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

const Editor = () => {

    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const { id } = useParams()
    const navigate = useNavigate()
    const [authenticated, setAuthenticated] = useState(false)
    const {user} = useAuthContext()
    // const userId = user.checkUser._id
    const userId = user?.checkUser?._id

    // rendering the editor component
    useEffect(() => {

        const user = localStorage.getItem('user')

        if(!user) {
            setAuthenticated(false)
            navigate('/login')
        }
        else {
            setAuthenticated(true)
            const quillServer = new Quill('#editor', {
                theme: 'snow',
                modules: {toolbar: toolbarOptions}
            })
            // document is disabled till the time it is loaded
            quillServer.disable()
            quillServer.setText('Loading the document...')
            setQuill((quillServer))
        }

    }, [])


    // making connections
    useEffect(() => {

        if(!authenticated) {
            return
        }

        const socketServer = io(process.env.REACT_APP_SERVER_URL)
        setSocket(socketServer)

        return () => {
            socketServer.disconnect()
        }

    }, [authenticated])


    // handling changes in the editor
    useEffect(() => {

        if(!authenticated) {
            return
        }

        if(socket === null || quill === null)   return

        const handleChange = (delta, oldData, source) => {
            if (source !== 'user') return
            socket && socket.emit('send-changes', delta)
        }

        // detecting changes using quill and send data to backend
        quill && quill.on('text-change', handleChange)

        return () => {
            quill && quill.off('text-change', handleChange)
        }

    }, [quill, socket, authenticated])


    // broadcasting changes to all users
    useEffect(() => {

        if(!authenticated) {
            return
        }

        if(socket === null || quill === null)   return

        const handleChange = (delta) => {
            // updating contents to all other users
            quill.updateContents(delta)
        }

        // receiving data from backend
        socket && socket.on('receive-changes', handleChange)

        return () => {
            socket && socket.off('receive-changes', handleChange)
        }

    }, [quill, socket, authenticated])


    // handling changes in a specific document
    useEffect(() => {

        if(!authenticated) {
            return
        }

        if(quill === null || socket === null)   return

        // enabling document when it is available
        socket && socket.once('load-document', document => {
            quill && quill.setContents(document)
            quill && quill.enable()
        })

        socket && socket.emit('get-document', id, userId)



    }, [quill, socket, id, authenticated, userId])


    // saving data after some interval
    useEffect(() => {

        if(!authenticated) {
            return
        }

        if(socket === null || quill === null)   return

        const interval = setInterval(() => {
            socket && socket.emit('save-document', quill.getContents())
        }, 2000)

        return () => {
            clearInterval(interval)
        }

    }, [socket, quill, authenticated])



    return (
        <>
            <Header />

            <Component>
                <Box className='editor-container' id='editor'></Box>
            </Component>
        </>
    )
}

export default Editor