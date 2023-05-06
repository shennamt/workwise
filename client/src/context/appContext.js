import React from 'react'
import { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from 'axios'

import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
} from './actions'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: null,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
}

const AppContext = React.createContext()

// provider looks for children to render the app
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // for useReducer, pass the object and must pass the type property
    // can even provide other properties but now we stick we payload
    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 5000)
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    const setupUser = async ({currentUser, endPoint, alertText}) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
            const { user, token, location } = data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload:{ user, token, location, alertText }
            })
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            dispatch({
                type:SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }

    return <AppContext.Provider value={{ ...state, displayAlert, setupUser }}>
        { children }
    </AppContext.Provider>
}

// without this custom hook, in every component i would need to
// import useContext and set up appContext to access the value props.
const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }