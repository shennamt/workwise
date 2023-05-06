import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

// Default state
const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

//import axios
// dispatch reguser then handle the action by state isloading is true
// so that the person cant submit again
// since axios returns a promise, use async await
// then set up a try catch for async errs
// POST method because that's is req in server
// rmb / cos of proxy
// then pass in data as second argument AKA currentUser
// maybe log res in first req just to double check lol
//at dispatch, rmb type and pass in the payload obj
// in reducer, set up the actions types on success and error
// on success, add to local storage
// dont forget err handling for reg too 

const Register = () => {
    const navigate = useNavigate()
    const [values, setValues] =  useState(initialState)
    const { user, isLoading, showAlert, displayAlert, registerUser } = useAppContext()

    // spread out curr values, then set the control to opposite
    const toggleMember = () => {
        setValues({...values,isMember: !values.isMember})
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if(!email || !password || (!isMember && !name)){
            displayAlert()
            return
        }
        const currentUser = { name, email, password }
        if (isMember){
            console.log("already member")
        } else {
            registerUser(currentUser)
        }
    }

    // in the dependency arr it shows that it will be invoked in init render + each time user or nav changes
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}

                {/* name input */}
                {!values.isMember && (
                    <FormRow
                        type='text'
                        name='name'
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}

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

                <button type='submit' className='btn btn-block' disabled={isLoading}>
                    Submit
                </button>

                <p>
                    {values.isMember? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register