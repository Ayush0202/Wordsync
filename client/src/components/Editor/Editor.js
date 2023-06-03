import React, {useEffect} from 'react'
import Quill from 'quill'

import {Box} from '@mui/material'
import styled from '@emotion/styled'
import 'quill/dist/quill.snow.css'
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

    // rendering the editor component
    useEffect(() => {
        const quillServer = new Quill('#editor', {
            theme: 'snow',
            modules: {toolbar: toolbarOptions}
        })
    }, [])


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