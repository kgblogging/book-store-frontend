
import { apiFunction } from "../../apiCalls/function";
import * as APIs from "../../apiCalls/urls/admin/auth";

export const handleLogin = (data) => {
    return apiFunction(APIs.LOGIN, "post", data, null, "admin");
};
export const handleRegister = (data) => {
    return apiFunction(APIs.ADD_USER, "post", data, null, "admin");
};
export const handleChangePassword = (data) => {
    return apiFunction(APIs.CHANGE_PASSWORD, "post", data, true,)
}
