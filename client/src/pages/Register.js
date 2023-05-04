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
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>Register</h3>
                {/* name input */}
                <div className='form-row'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input type='text' value={values.name} name='name' on onChange={handleChange} className='form-input'/>
                    <button type='submit' className='btn btn-block'>Submit</button>
                </div>
            </form>
        </Wrapper>
    )
}

export default Register