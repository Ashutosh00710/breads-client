import { apiCall } from '../../common/services/api';
import { addError } from '../errors/actions';
import { LOAD_FAVORITES } from './actionTypes';
import { addLoader, removeLoader } from '../loader/actions';

export const loadFavorites = favorites => ({
    type: LOAD_FAVORITES,
    favorites
})

export const fetchFavoriteReadings = userId => {
    return dispatch => {
        dispatch(addLoader('favoriteReadings'));
        return apiCall('get', `/readings/${userId}/favorites`)
            .then(res => {
                dispatch(loadFavorites(res));
                dispatch(removeLoader('favoriteReadings'));
            })
            .catch(err => {
                dispatch(addError(err.message));
            })
    }
}