import { useState, useReducer, useContext } from 'react'

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
}

const AppContext = React.createContext()

// context has 2 components - provider and consumer.
// not using consumer but need to set up new component app provider
// provider looks for children to render the app
// dummy state for now
const AppProvider = ({ children }) => {
    const [state, setState] = useState(initialState)

    // value prop is the state value
    // render the children because it's the app duh
    return <AppContext.Provider value={{...state}}>
        { children }
    </AppContext.Provider>
}

// then set up a custom hook
// without the hook then in every component i would need to
// import useContext and set up appContext to access the value props

export { AppProvider, initialState }