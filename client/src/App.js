import {useState, useEffect} from "react"
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import Dashboard from "./components/Dashboard/Dashboard"
import HomePage from "./components/HomePage/HomePage";
import Editor from './components/Editor/Editor'
import Login from "./components/Login/Login";
import Register from './components/Register/Register'
import AccountDelete from "./components/AccountDelete/AccountDelete"

import {v4 as uuid} from 'uuid'

import {useAuthContext} from "./hooks/useAuthContext"

function App() {

    const {user} = useAuthContext()



  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/docs/dashboard'/>} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to='/docs/dashboard'/> } />
            <Route path='/docs/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' /> } />
            <Route path='/docs/new' element={user ? <Navigate replace to={`/docs/${uuid()}`} /> : <Navigate to='/login' /> } />
            <Route path='/docs/:id' element={<Editor />  } />
            <Route path='/delete' element={user ? <AccountDelete /> : <Navigate to='/login' /> } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

