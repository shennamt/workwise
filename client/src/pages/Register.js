import { useState, useEffect } from 'react'
import { Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'

// Default state
const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {

    const [values, setValues] =  useState(initialState)

    // global state and useNavigate

    // logs to show which input we're working on
    const handleChange = (e) => {
        console.log(e.target)
    }

    // looking for event Obj and log the form
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
    }
    return (
        <h1>Register</h1>
    )
}

export default Register