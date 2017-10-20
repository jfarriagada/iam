import { createStore, combineReducers } from 'redux'
// redux form
import { reducer as formReducer } from 'redux-form'

// reducers que devuelven un nuevo estado

const session = (state={}, action) => {
    var new_state = Object.assign({}, state)
    switch (action.type) {
        case 'USER_AUTH':
            new_state = action.user
            return new_state
        case 'USER_LOGOUT':
            new_state = null
            return new_state
        default:
            return state
    }
}

const reducer = combineReducers({
    session
})

const store = createStore(reducer)

export default store
