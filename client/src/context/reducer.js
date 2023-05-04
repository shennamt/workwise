// set up reducer
// import into appContext.js
// then replace dummy state with useReducer
// pass function from reducer to access state

const reducer = (state, action) => {
    // run if we dispatch action with no handler
    throw new Error(`no such action : ${action.type}`)
}

export default reducer