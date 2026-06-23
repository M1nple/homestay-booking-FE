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

function getUser() {

    const user =
        localStorage.getItem(
            STORAGE_KEYS.USER
        );

    return user
        ? JSON.parse(user)
        : null;
}

function getRole() {

    const user =
        getUser();

    return user
        ? user.role
        : null;
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

    localStorage.removeItem(
        STORAGE_KEYS.USER
    );

    location.href =
        "index.html";
}