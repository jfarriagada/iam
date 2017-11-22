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

const posts = (state=[], action) => {
    var new_state = Object.assign({}, state)
    switch (action.type) {
        case 'POST_LIST':
            new_state = state.concat(action.data)
            console.log("new_state")
            console.log(new_state)
            return new_state
        case 'POST_CLEAR':
            new_state = []
            return new_state
        default:
            return state
    }
}

const post_id = (state=[], action) => {
    var new_state = Object.assign({}, state)
    switch (action.type) {
        case 'POST_ID':
            new_state = action.data
            return new_state
        case 'POST_ID_CLEAR':
            new_state = []
            return new_state
        default:
            return state
    }
}

const post_id_key = (state=[], action) => {
    var new_state = Object.assign({}, state)
    switch (action.type) {
        case 'POST_ID_KEY':
            new_state = action.id
            return new_state
        default:
            return state
    }
}

const edit_post = (state = {}, action) => {
    var new_state = Object.assign({}, state)

    switch (action.type) {
        case 'POST_ID':
            new_state = action.data
            return new_state
        default:
            return state
    }
}

const banner = (state = {}, action) => {
    var new_state = Object.assign({}, state)

    switch (action.type) {
        case 'BANNER_URL':
            new_state = action.data
            return new_state
        default:
            return state
    }
}

const reducer = combineReducers({
    form: formReducer,
    session,
    posts,
    post_id,
    post_id_key,
    edit_post,
    banner
})

const store = createStore(reducer)

export default store
