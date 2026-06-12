document.getElementById(
    "navbar"
).innerHTML = renderNavbar();

const roomId =
    getQueryParam("id");

loadRoom();

async function loadRoom() {

    try {

        const room =
            await apiRequest(
                `/rooms/${roomId}/`
            );

        renderRoom(room);

    } catch (error) {

        console.error(error);

        document.getElementById(
            "roomDetail"
        ).innerHTML = `
            <div
                class="
                    p-10
                    text-center
                    text-red-500
                "
            >
                Failed to load room.
            </div>
        `;
    }
}

function renderRoom(room) {

    const container =
        document.getElementById(
            "roomDetail"
        );

    let mainImage =
        "https://placehold.co/1200x700";

    if (
        room.images &&
        room.images.length
    ) {

        mainImage =
            room.images[0].image_url;

        if (
            mainImage.startsWith("/")
        ) {

            mainImage =
                "http://127.0.0.1:8000" +
                mainImage;
        }
    }

    container.innerHTML = `

        <img
            src="${mainImage}"
            class="
                w-full
                h-[450px]
                object-cover
            "
        >

        <div class="p-8">

            <div
                class="
                    flex
                    justify-between
                    items-start
                    gap-6
                    mb-8
                "
            >

                <div>

                    <h1
                        class="
                            text-4xl
                            font-bold
                            mb-3
                        "
                    >
                        ${room.name}
                    </h1>

                    <div
                        class="
                            flex
                            gap-6
                            text-gray-600
                        "
                    >

                        <span>
                            👥 Capacity:
                            ${room.capacity}
                        </span>

                        <span>
                            ⭐ Rating:
                            ${room.avg_rating || "Chưa có đánh giá"}
                        </span>

                    </div>

                </div>

                <div
                    class="
                        text-right
                    "
                >

                    <div
                        class="
                            text-3xl
                            font-bold
                            text-rose-500
                        "
                    >
                        ${formatPrice(
                            room.price
                        )}
                    </div>

                    <div
                        class="
                            text-gray-500
                        "
                    >
                        per night
                    </div>

                </div>

            </div>

            <div class="mb-10">

                <h2
                    class="
                        text-2xl
                        font-bold
                        mb-4
                    "
                >
                    Description
                </h2>

                <p
                    class="
                        text-gray-700
                        leading-7
                    "
                >
                    ${room.description || "No description available."}
                </p>

            </div>

            <div class="mb-10">

                <h2
                    class="
                        text-2xl
                        font-bold
                        mb-4
                    "
                >
                    Amenities
                </h2>

                <div
                    class="
                        flex
                        flex-wrap
                        gap-3
                    "
                >

                    ${
                        room.amenities_names &&
                        room.amenities_names.length

                        ? room.amenities_names.map(
                            amenity => `
                                <span
                                    class="
                                        bg-rose-50
                                        text-rose-600
                                        px-4
                                        py-2
                                        rounded-full
                                        text-sm
                                        font-medium
                                    "
                                >
                                    ✓ ${amenity}
                                </span> 
                            `
                        ).join("")

                        : `
                            <span
                                class="
                                    text-gray-500
                                "
                            >
                                No amenities
                            </span>
                        `
                    }

                </div>

            </div>

            <div class="mb-10">

                <h2
                    class="
                        text-2xl
                        font-bold
                        mb-4
                    "
                >
                    Reviews
                </h2>

                <div
                    class="
                        space-y-4
                    "
                >

                    ${
                        room.reviews &&
                        room.reviews.length

                        ? room.reviews.map(
                            review => `

                                <div
                                    class="
                                        border
                                        rounded-2xl
                                        p-5
                                    "
                                >

                                    <div
                                        class="
                                            flex
                                            justify-between
                                            items-center
                                            mb-2
                                        "
                                    >

                                        <strong>
                                            ${review.user_name}
                                        </strong>

                                        <span>
                                            ⭐ ${review.rating}
                                        </span>

                                    </div>

                                    <p
                                        class="
                                            text-gray-700
                                            mb-3
                                        "
                                    >
                                        ${review.comment || ""}
                                    </p>

                                    ${
                                        review.images &&
                                        review.images.length

                                        ? `
                                            <div
                                                class="
                                                    flex
                                                    gap-2
                                                    flex-wrap
                                                "
                                            >

                                                ${review.images.map(
                                                    image => `

                                                        <img
                                                            src="${image.image_url}"
                                                            class="
                                                                w-24
                                                                h-24
                                                                object-cover
                                                                rounded-lg
                                                            "
                                                        >

                                                    `
                                                ).join("")}

                                            </div>
                                        `

                                        : ""
                                    }

                                    <div
                                        class="
                                            mt-3
                                            text-sm
                                            text-gray-500
                                        "
                                    >
                                        ${
                                            review.created_at
                                            ? new Date(
                                                review.created_at
                                            ).toLocaleDateString(
                                                "vi-VN"
                                            )
                                            : ""
                                        }
                                    </div>

                                </div>

                            `
                        ).join("")

                        : `
                            <div
                                class="
                                    text-gray-500
                                "
                            >
                                No reviews yet
                            </div>
                        `
                    }

                </div>

            </div>

            <button
                onclick="
                    location.href=
                    'booking.html?room=${room.id}'
                "
                class="
                    w-full
                    bg-rose-500
                    text-white
                    py-4
                    rounded-2xl
                    text-lg
                    font-semibold
                "
            >

                Book Now

            </button>

        </div>
    `;
}