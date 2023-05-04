import { useState, useEffect } from 'react'
import { Logo, FormRow } from '../components'
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
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>Register</h3>
                {/* name input */}
                <FormRow
                type='text'
                name='name'
                value={values.name}
                handleChange={handleChange}
                />

                {/* email input */}
                <FormRow
                type='email'
                name='email'
                value={values.email}
                handleChange={handleChange}
                />

                {/* password input */}
                <FormRow
                type='password'
                name='password'
                value={values.password}
                handleChange={handleChange}
                />

                <button type='submit' className='btn btn-block'>
                    Submit
                </button>
            </form>
        </Wrapper>
    )
}

export default Register