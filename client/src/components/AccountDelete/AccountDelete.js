import React from 'react'

import { Link } from 'react-router-dom'

import {useAuthContext} from "../../hooks/useAuthContext"

import {deleteUser} from '../../services/api'

import Header from '../Header/Header'

import './AccountDelete.css'

const AccountDelete = () => {

    const {user} = useAuthContext()

    const {dispatch} = useAuthContext()

    const onClickHandle = async () => {

        console.log('i am clicked')

        try {
            const authToken = user.token
            const response = await deleteUser(authToken)
            localStorage.removeItem('user')
            dispatch({type: 'LOGOUT'})
            console.log(response)

        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>

            <Header />

            <div className='account-delete-container'>
                <h1 className='account-delete-title'>Delete Account?</h1>
                <p className='account-delete-para'>Deleting you account will remove all documents that you have saved. You will no longer be able to have access to them and your account will be deleted</p>
                <button className='account-delete-delete-button' onClick={onClickHandle}>Yes</button>
                <Link to='/docs/dashboard'><button className='account-delete-cancel-button'>No</button></Link>
            </div>

        </>
    )
}

export default AccountDelete