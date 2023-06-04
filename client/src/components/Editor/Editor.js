import React, {useEffect, useState} from 'react'
import Quill from 'quill'

import {Box} from '@mui/material'
import styled from '@emotion/styled'
import 'quill/dist/quill.snow.css'
import './Editor.css'
import Header from "../Header/Header";

import {io} from 'socket.io-client'

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


    // rendering the editor component
    useEffect(() => {
        const quillServer = new Quill('#editor', {
            theme: 'snow',
            modules: {toolbar: toolbarOptions}
        })
        setQuill((quillServer))
    }, [])


    // making connections
    useEffect(() => {
        const socketServer = io('http://localhost:5000')
        setSocket(socketServer)

        return () => {
            socketServer.disconnect()
        }

    }, [])


    // handling changes in the editor
    useEffect(() => {

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

    }, [quill, socket])


    // broadcasting changes to all users
    useEffect(() => {

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

    }, [quill, socket])



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