import * as actionTypes from './actionTypes';

const initialState = {
    filters: {
        "search": "",
        "sort": {
            "attributes": ["createdAt"],
            "sorts": ["desc"]
        },
        "filters": [
        ],
        "pageNo": 1,
        "itemsPerPage": 10
    },
    allData: [],
    genreDropdown:[]

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_BOOK_REDUCER:
            state = {
                ...state,
                allData: action.payload.data,
                count: action.payload.count
            }

            break;
        case actionTypes.UPDATE_FILTER:
            state = {
                ...state,
                filters: action.payload,
            }
            break;
        case actionTypes.UPDATE_REDUCER:
            state = {
                ...state,
                filters: action.payload,
            }
            break;
        default:
            state = { ...state };
            break;

    }

    return state;
}

export default reducer;