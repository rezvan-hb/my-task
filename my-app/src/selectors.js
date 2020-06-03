import { createSelector } from 'reselect'

const getUsers = store => store ? store.users : null;
const getPhotos = store => store ? store.photos : null;

export const getOriginalDataOfUsers = createSelector(
    [getUsers],
    users => (
        users ? users.map(user => ({
                username: user.username,
                email: user.email,
                address: user.address
            }))    
        : []
    )
)

export const getOriginalDataOfPhotos = createSelector(
    [getPhotos],
    (photos) => photos ? photos.map(photo => photo.url) : []
)
 
