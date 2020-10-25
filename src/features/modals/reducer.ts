import { ADD_MODAL, REMOVE_MODAL } from '../actionTypes';
import { ModalActionTypes, ModalState } from './types';

const initialState: ModalState = {
    modalType: null,
    modalProps: { open: false }
}

export default (state: ModalState = initialState, action: ModalActionTypes): ModalState => {
    switch (action.type) {
        case ADD_MODAL:
            return { ...action.payload };
        case REMOVE_MODAL:
            return { ...action.payload };
        default:
            return state;
    }
};