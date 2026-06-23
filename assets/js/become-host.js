if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

document
    .getElementById(
        "hostRequestForm"
    )
    .addEventListener(
        "submit",
        submitRequest
    );

async function submitRequest(
    e
) {

    e.preventDefault();

    try {

        const formData =
            new FormData();

        formData.append(
            "business_name",
            document.getElementById(
                "business_name"
            ).value
        );

        formData.append(
            "description",
            document.getElementById(
                "description"
            ).value
        );

        formData.append(
            "identity_number",
            document.getElementById(
                "identity_number"
            ).value
        );

        formData.append(
            "reason",
            document.getElementById(
                "reason"
            ).value
        );

        const file =
            document.getElementById(
                "identity_image"
            ).files[0];

        if (file) {

            formData.append(
                "identity_image",
                file
            );
        }

        await apiRequest(
            "/customer/host-requests/",
            "POST",
            formData,
            true
        );

        alert(
            "Host request submitted successfully"
        );

        location.href =
            "index.html";

    } catch (error) {

        alert(
            error.message
        );
    }
}