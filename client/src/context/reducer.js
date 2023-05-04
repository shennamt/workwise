import { DISPLAY_ALERT } from './actions'

const reducer = (state, action) => {
    // if action type is display alert
    // return state but modify show alert
    // change alert type to danger
    // change alert text
    if(action.type === DISPLAY_ALERT){
        return {
            ...state,
            showAlert: true,
            alertType:'danger',
            alertText: 'Please provide all inputs',
        }
    }
    // run if we dispatch action with no handler
    throw new Error(`no such action : ${action.type}`)
}

export default reducer