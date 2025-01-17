import Notiflix from 'notiflix';


export const notiflixLoaderStart = () => {
    Notiflix.Notify.Init({ width: '300px', fontSize: '14px', timeout: 4000, messageMaxLength: 200, });
    Notiflix.Loading.Standard('...');
}

export const notiflixLoaderEnd = () => {
    Notiflix.Loading.Remove()
}

export const notiflixStatus = (status, msg) => {
    if (status) {
        Notiflix.Loading.Remove()
        Notiflix.Notify.Success(msg)
    }
    else {
        Notiflix.Loading.Remove()
        Notiflix.Notify.Failure(msg)
    }

}

export const notificationStatus = (result) => {
    
    Notiflix.Loading.Remove()
    if (result.status) {
        Notiflix.Notify.Success(result.message)
    }
    else {        
        Notiflix.Notify.Failure(result.message)
    }

}

//RealTime Notifications
export const realTimeNotification = (status, msg) => {
    if (status) {
        Notiflix.Loading.Remove()
        Notiflix.Notify.Success(msg)
    }
    else {
        console.log("asdsad")
        Notiflix.Loading.Remove()
        Notiflix.Notify.Failure(msg)
    }

}

//Informative Notifications
