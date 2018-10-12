const initialState = {
    username: '',
    user_id: 0,
    profile_pic: ''
}

// types
const UPDATE_USER = 'UPDATE_USER';

// action creators
export function updateUser(data) {
    return {
        type: UPDATE_USER,
        payload: data
    }
}

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, state, { 
                username: action.payload.username,
                user_id: action.payload.user_id,
                profile_pic: action.payload.profile_pic
            })
        default:
            return state;
    }
}
