function setItem(name, value, hoursToExpire) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + hoursToExpire * 60 * 60 * 1000);
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getItem(name) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const cookieParts = cookie.split('=');

        if (cookieParts.length === 2) {
            const cookieName = decodeURIComponent(cookieParts[0]);
            const cookieValue = decodeURIComponent(cookieParts[1]);

            if (cookieName === name) {
                return cookieValue;
            }
        }
    }

    return null;
}

function clear() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const cookieParts = cookie.split('=');

        if (cookieParts.length === 2) {
            const cookieName = decodeURIComponent(cookieParts[0]);
            const expiredDate = new Date(0);
            document.cookie = `${cookieName}=; expires=${expiredDate.toUTCString()}; path=/`;
        }
    }
}

function remove(name) {
    // Set the cookie's expiration date to the past
    const expiredDate = new Date(0);
    document.cookie = `${name}=; expires=${expiredDate.toUTCString()}; path=/`;
}

// export default {
//     setItem,
//     getItem,
//     clear,
//     remove,
// }