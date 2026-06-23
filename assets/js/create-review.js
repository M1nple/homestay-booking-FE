if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

const bookingId =
    new URLSearchParams(
        location.search
    ).get(
        "booking"
    );

const roomId =
    new URLSearchParams(
        location.search
    ).get(
        "room"
    );

document
    .getElementById(
        "reviewForm"
    )
    .addEventListener(
        "submit",
        createReview
    );

async function createReview(
    e
) {

    e.preventDefault();

    try {

        const formData =
            new FormData();

        formData.append(
            "booking",
            bookingId
        );

        formData.append(
            "room",
            roomId
        );

        formData.append(
            "rating",
            document.getElementById(
                "rating"
            ).value
        );

        formData.append(
            "comment",
            document.getElementById(
                "comment"
            ).value
        );

        const files =
            document.getElementById(
                "images"
            ).files;

        for (
            let i = 0;
            i < files.length;
            i++
        ) {

            formData.append(
                "images",
                files[i]
            );
        }

        await apiRequest(
            "/reviews/",
            "POST",
            formData,
            true
        );

        alert(
            "Review Success"
        );

        location.href =
            "my-reviews.html";

    }

    catch (error) {

        alert(
            error.message
        );
    }
}