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

        headers["Authorization"] =
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

    const response =
        await fetch(
            API_BASE_URL +
            endpoint,
            options
        );

    // if (!response.ok) {

    //     throw new Error(
    //         "Request failed"
    //     );
    // }

    if (!response.ok) {

    const errorData = await response.json();

    let message = "Request failed";

    if (errorData.non_field_errors) {
        message = errorData.non_field_errors[0];
    }
    else if (errorData.detail) {
        message = errorData.detail;
    }
    else {
        message = JSON.stringify(errorData);
    }

    throw new Error(message);
    }

    return await response.json();
}