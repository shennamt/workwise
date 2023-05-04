import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'

// Default state
const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    showAlert: false,
}

// isMember is used to toggle the Name form row

const Register = () => {

    const [values, setValues] =  useState(initialState)

    // global state and useNavigate

    // spread out curr values, then set the control to opposite
    const toggleMember = () => {
        setValues({...values,isMember: !values.isMember})
    }

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
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {values.showAlert && <Alert />}

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

                <p>
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        Register
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register