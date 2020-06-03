
export const GET_USERS = 'GET_USERS'
const getUsers = (users) => ({
    type: GET_USERS,
    users,
});

export const GET_PHOTOS = 'GET_PHOTOS'
const getPhotos = (photos) => ({
    type: GET_PHOTOS,
    photos,
});

export const FETCH_STARTED = 'FETCH_STARTED'
const fetchStarted = () => ({
    type: FETCH_STARTED
})

export const FETCH_FAILURE = 'FETCH_FAILURE'
const fetchFailure = (name, error) => ({
    type: FETCH_FAILURE,
    name,
    error
})

export const FETCH_SUCCESS = 'FETCH_SUCCESS'
const fetchSuccess = () => ({
    type: FETCH_SUCCESS
})

export const getFetch = () => {
    return (dispatch) => {
        dispatch(fetchStarted())

        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(getUsers(data))
            })
            .catch(error => dispatch(fetchFailure('users', error)))


        fetch('https://jsonplaceholder.typicode.com/photos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(getPhotos(data))
                dispatch(fetchSuccess())
            })
            .catch(error => dispatch(fetchFailure('photos', error)))
    }
}