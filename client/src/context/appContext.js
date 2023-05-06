import React from 'react'
import { useReducer, useContext } from 'react'
import reducer from './reducer'
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR
} from './actions'

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    token: null,
    userLocation: '',
}

const AppContext = React.createContext()

// context has 2 components - provider and consumer.
// not using consumer but need to set up new component app provider
// provider looks for children to render the app
// dummy state for now
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

    const registerUser = async (currentUser) => {
        console.log(currentUser)
    }

    // value prop is the state value
    return <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
        { children }
    </AppContext.Provider>
}

// without this custom hook, in every component i would need to
// import useContext and set up appContext to access the value props. leceh.
const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }