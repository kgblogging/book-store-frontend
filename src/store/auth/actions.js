import * as actionTypes from "./actionTypes";
import { actionNotifier } from "../../components/ui/toast";
import { handleLogin, handleRegister } from "./apis";
import { apiLoading, apiLoadingEnd } from "../notification/action";
// import { getAllPermission } from "../../Shared/permission";
// import { notiflixLoaderStart, notiflixStatus, notiflixLoaderEnd } from '../../components/ui/notification'

// import { getDataFromStore } from "../../store/getStore";

export const onLogin = (state, navigate) => {
    return async (dispatch) => {
        // notiflixLoaderStart()
        dispatch(apiLoading())
        let result = await handleLogin(state)
        if (result.status) {
            localStorage.setItem("bookStore", JSON.stringify(result))
            dispatch(updateAuthData(result));
            // actionNotifier.success(result.message);
            // navigate('/dashboard')
        } else {
            actionNotifier.error(result.message);
        }
        // notiflixLoaderEnd()
        dispatch(apiLoadingEnd());
    };
};

export const onRegister = (state, navigate) => {
    return async (dispatch) => {
        dispatch(apiLoading())
        let result = await handleRegister(state)
        if (result.status) {
            actionNotifier.success(result.message);
            navigate('/')
        } else {
            actionNotifier.error(result.message);
        }
        dispatch(apiLoadingEnd());
    };
};

export const onLogout = (navigate) => {
    return (dispatch) => {
        localStorage.removeItem("bookStore");
        dispatch(updateAuthData());
        navigate("/");
    };
};

export const onReload = () => {
    return async (dispatch) => {
        let token = localStorage.getItem("bookStore")
        if (token) {
            token = JSON.parse(token)
            dispatch(updateAuthData(token));
        }
    };
};
// export const onReload = () => {
//     return async (dispatch) => {
//         // let result = await getPermission()
//         // // console.log(result);
//         // if (result.status) {
//         //     let token = localStorage.getItem("call-center-admin-token")
//         //     if (token) {
//         //         token = JSON.parse(token)
//         //         token = {
//         //             ...result.data,
//         //             token: token.token
//         //         }
//         //         // console.log(token);
//         //         dispatch(updateAuthData(token));
//         //         dispatch(updateReducer("allPermissionJson", getAllPermission(result.data.globalPermissions)))
//         //     }
//         // }
//         let token = localStorage.getItem("call-center-admin-token")
//         if (token) {
//             token = JSON.parse(token)
//             dispatch(updateAuthData(token));
//         }
//     };
// };


// export const onLogout = () => {
//     return (dispatch) => {
//         localStorage.removeItem("call-center-admin-token")
//         window.open("/", "_self")
//     }
// };

export const updateAuthData = (data) => {
    return {
        type: actionTypes.UPDATE_AUTH_DATA,
        payload: data,
    };
};

export const updateReducer = (key, data) => {
    return {
        type: actionTypes.UPDATE_REDUCER,
        payload: { key, data }
    };
};




