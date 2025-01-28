import { apiFunction } from "../../apiCalls/function"
import { ADD_BOOK, DELETE_BOOK_API, EDIT_BOOK_API, VIEW_BOOK_API } from "../../apiCalls/urls/admin/book"
import { VIEW_BOOK } from "../../container/allBookContainer/const"
import { actionNotifier } from "../../components/ui/toast";
import { handleView } from "../../shared/general";
import { getDataFromStore } from "../../store/getStore"
import { apiLoading, apiLoadingEnd } from "../../store/notification/action";
import * as actionTypes from "./actionTypes";


// apis
export const fetchAllBook = async (data) => {
    return await apiFunction(VIEW_BOOK_API, 'post', data, true, false)
}

export const addBook = async (data) => {
    return await apiFunction(ADD_BOOK, 'post', data, true, false)
}

export const editBook = async (data) => {
    return await apiFunction(EDIT_BOOK_API, 'put', data, true, false)
}

export const deleteBook = async (data) => {
    return await apiFunction(DELETE_BOOK_API, 'delete', data, true, false)
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
        let result = await fetchAllBook(allBook.filters);
        if (result.status) {
            dispatch(updateBookReducer(result?.data, result.count))
        }
        else {
            actionNotifier.error(result.message)
        }
        dispatch(apiLoadingEnd())
    }
}


export function onAddBook(data, navigate) {
    return async (dispatch) => {
        dispatch(apiLoading())
        let result = await addBook(data)
        if (result.status) {
            actionNotifier.success("Book Added")
            handleView(navigate, VIEW_BOOK);
            dispatch(onFetchAllBooks())
        } else {
            actionNotifier.error(result.message)
        }
        dispatch(apiLoadingEnd())
    }
}

export function onEditBook(data, navigate) {
    return async (dispatch) => {
        dispatch(apiLoading())
        let result = await editBook(data)
        if (result.status) {
            actionNotifier.success("Book Updated")
            handleView(navigate, VIEW_BOOK);
            dispatch(onFetchAllBooks())
        } else {
            actionNotifier.error(result.message)
        }
        dispatch(apiLoadingEnd())
    }
}

export function onDeleteBook(data) {
    return async (dispatch) => {
        dispatch(apiLoading())
        let result = await deleteBook(data)
        if (result.status) {
            actionNotifier.success(result.message)
            dispatch(onFetchAllBooks())
        } else {
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

export const updateFilters = (data) => {
    return {
        type: actionTypes.UPDATE_FILTER,
        payload: data
    };
}

export const updateReducer = (data, item) => {
    return {
        type: actionTypes.UPDATE_REDUCER,
        payload: { data, item }
    };
}