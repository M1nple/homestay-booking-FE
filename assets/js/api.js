async function apiRequest(
    endpoint,
    method = "GET",
    data = null,
    isFormData = false
) {

    const headers = {};

    const token =
        localStorage.getItem(
            STORAGE_KEYS.ACCESS
        );

    if (token) {
        headers.Authorization =
            `Bearer ${token}`;
    }

    if (!isFormData) {
        headers["Content-Type"] =
            "application/json";
    }

    const options = {
        method,
        headers
    };

    if (data) {
        options.body =
            isFormData
                ? data
                : JSON.stringify(data);
    }

    let response =
        await fetch(
            API_BASE_URL + endpoint,
            options
        );

    // token hết hạn
    if (response.status === 401) {

        console.log(
            "Access token expired. Refreshing..."
        );

        const refreshed =
            await refreshAccessToken();

        console.log(
            "Refresh result:",
            refreshed
        );

        if (refreshed) {

            const newToken =
                localStorage.getItem(
                    STORAGE_KEYS.ACCESS
                );

            options.headers.Authorization =
                `Bearer ${newToken}`;

            response =
                await fetch(
                    API_BASE_URL + endpoint,
                    options
                );
        }
    }

    // refresh cũng hết hạn
    if (response.status === 401) {

        localStorage.clear();

        window.location.href =
            "login.html";

        return;
    }

    if (!response.ok) {

        const errorData =
            await response.json();

        let message =
            "Request failed";

        if (
            errorData.non_field_errors
        ) {

            message =
                errorData
                    .non_field_errors[0];

        } else if (
            errorData.detail
        ) {

            message =
                errorData.detail;

        } else {

            message =
                JSON.stringify(
                    errorData
                );
        }

        throw new Error(
            message
        );
    }

    return await response.json();
}

// làm mới token khi hết hạn 
async function refreshAccessToken() {

    const refresh =
        localStorage.getItem(
            STORAGE_KEYS.REFRESH
        );

    if (!refresh) {
        return false;
    }

    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/auth/refresh/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        refresh
                    })
                }
            );

        if (!response.ok) {
            return false;
        }

        const data =
            await response.json();

        localStorage.setItem(
            STORAGE_KEYS.ACCESS,
            data.access
        );

        return true;

    } catch (error) {

        console.error(
            "Refresh token failed",
            error
        );

        return false;
    }
}