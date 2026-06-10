function saveTokens(data) {

    localStorage.setItem(
        STORAGE_KEYS.ACCESS,
        data.access
    );

    localStorage.setItem(
        STORAGE_KEYS.REFRESH,
        data.refresh
    );
}

function getAccessToken() {

    return localStorage.getItem(
        STORAGE_KEYS.ACCESS
    );
}

function getRefreshToken() {

    return localStorage.getItem(
        STORAGE_KEYS.REFRESH
    );
}

function isAuthenticated() {

    return !!getAccessToken();
}

function logout() {

    localStorage.removeItem(
        STORAGE_KEYS.ACCESS
    );

    localStorage.removeItem(
        STORAGE_KEYS.REFRESH
    );

    window.location.href =
        "login.html";
}