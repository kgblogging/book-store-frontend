import axios from 'axios';

import { getDataFromStore } from "../../store/getStore"
// const errorMessage = "Something went wrong. Please try again";


const getToken = () => {
    let auth = getDataFromStore("Auth")
    return auth.auth?.token ? auth.auth?.token : ""
}

export const apiFunction = async (url, method, postData, token, section, extraConfig) => {
    let baseUrl = process.env.REACT_APP_API_URL;
    if (section === "admin") {
        baseUrl = process.env.REACT_APP_API_URL
    }
    let completeUrl = baseUrl + url;
    let config = {
        method: method,
        url: completeUrl,
        baseUrl,
        route: url,
        data: postData ? postData : {},
    };
    let data;
    // console.log(config)
    if (token) {
        let token = getToken();
        config = {
            ...config,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
    }

    if (extraConfig === "blob") {
        config = {
            ...config,
            responseType: 'blob',
        }
    }

    if (extraConfig === "multipart") {
        config.headers = {
            ...config.headers,
            "content-type": "multipart/form-data",
        }
    }
    if (extraConfig === "bypassCaptcha") {
        config.headers = {
            'X-Bypass-Recaptcha': true
        }
    }
    if (extraConfig === "urlencoded") {
        config.headers = {
            ...config.headers,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    await axios({ ...config })
        .then((res) => {
            if (extraConfig === "blob") {
                data = res.data
            }
            else {
                data = res.data;
            }
        })
        .catch((err) => {
            // console.log(err.response.data);
            // console.log(err.response);
            let error;
            if (typeof err.response?.data === "string") {
                error = JSON.parse(err.response.data);
            }
            else {
                console.log("hi")
                error = {
                    ...err.response.data,
                }
            }
            data = {
                ...error,
                code: err.response.status,
                status: false,
            };
        });
    // console.log(config);
    // console.log(data);
    return data;
};