if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

loadReviews();

async function loadReviews() {

    try {

        const reviews =
            await apiRequest(
                "/reviews/my/"
            );

        renderReviews(
            reviews
        );

    }

    catch (error) {

        console.error(
            error
        );
    }
}

function renderReviews(
    reviews
) {

    const container =
        document.getElementById(
            "reviewsContainer"
        );

    if (
        !reviews.length
    ) {

        container.innerHTML =
            `
            <div
                class="
                    bg-white
                    p-10
                    rounded-3xl
                    text-center
                "
            >
                No Reviews
            </div>
        `;

        return;
    }

    container.innerHTML =
        reviews
        .map(
            review => `

            <div
                class="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow
                "
            >

                <div
                    class="
                        flex
                        justify-between
                        mb-3
                    "
                >

                    <h2
                        class="
                            font-bold
                            text-xl
                        "
                    >
                        ${review.user_name}
                    </h2>

                    <span>
                        ⭐ ${review.rating}/5
                    </span>

                </div>

                <p
                    class="
                        text-gray-600
                        mb-4
                    "
                >
                    ${review.comment}
                </p>

                <div
                    class="
                        grid
                        grid-cols-3
                        gap-3
                        mb-4
                    "
                >

                    ${
                        review.images
                        .map(
                            image => `
                                <img
                                    src="${image.image_url}"
                                    class="
                                        w-full
                                        h-28
                                        object-cover
                                        rounded-xl
                                    "
                                >
                            `
                        )
                        .join("")
                    }

                </div>

                <div
                    class="
                        text-sm
                        text-gray-400
                    "
                >
                    ${new Date(
                        review.created_at
                    ).toLocaleString()}
                </div>

            </div>

        `
        )
        .join("");
}