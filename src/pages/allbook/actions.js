import { apiFunction } from "../../apiCalls/function"
import { VIEW_BOOK } from "../../apiCalls/urls/admin/book"
import { actionNotifier } from "../../components/ui/toast";
import { getDataFromStore } from "../../store/getStore"
import { apiLoading, apiLoadingEnd } from "../../store/notification/action";
import * as actionTypes from "./actionTypes";


// apis
export const fetchAllBook = async (data) => {
    return await apiFunction(VIEW_BOOK, 'get', data, true, false)
}

export const onLoad = () => {
    return async (dispatch) => {
        dispatch(onFetchAllBooks())
    }
}

export function onFetchAllBooks() {
    return async (dispatch) => {
        dispatch(apiLoading())
        let allBook = getDataFromStore("BookReducer")
        let result = await fetchAllBook(allBook);
        if (result.status) {
            dispatch(updateBookReducer(result?.data, result.count))
        }
        else {
            actionNotifier.error(result.message)
        }
        dispatch(apiLoadingEnd())
    }
}

// ACTIONS
export const updateBookReducer = (data, count) => {
    return {
        type: actionTypes.UPDATE_BOOK_REDUCER,
        payload: { data, count }
    };
}

export const updateReducer = (data, item) => {
    return {
        type: actionTypes.UPDATE_REDUCER,
        payload: { data, item }
    };
}