document.getElementById(
    "navbar"
).innerHTML = renderNavbar();

const homestayId =
    getQueryParam("id");

loadHomestay();
loadRooms();

async function loadHomestay() {

    try {

        const homestay =
            await apiRequest(
                `/homestays/${homestayId}/`
            );

        renderHomestay(
            homestay
        );

    } catch (error) {

        console.error(error);

    }
}

async function loadRooms() {

    try {

        const rooms =
            await apiRequest(
                `/rooms/?homestay=${homestayId}`
            );

        renderRooms(
            rooms
        );

    } catch (error) {

        console.error(error);

    }
}

function renderHomestay(
    homestay
) {

    const container =
        document.getElementById(
            "homestayDetail"
        );

    const images =
        homestay.images || [];

    const gallery =
        images.length
            ? images.map(image => {

                let url =
                    image.image_url;

                if (
                    url.startsWith("/")
                ) {
                    url =
                        "http://127.0.0.1:8000" +
                        url;
                }

                return `
                    <img
                        src="${url}"
                        class="
                            rounded-2xl
                            h-72
                            w-full
                            object-cover
                        "
                    >
                `;
            }).join("")
            : `
                <img
                    src="https://placehold.co/1200x500"
                    class="
                        rounded-2xl
                        h-72
                        w-full
                        object-cover
                    "
                >
            `;

    container.innerHTML = `
        <h1
            class="
                text-4xl
                font-bold
                mb-6
            "
        >
            ${homestay.name}
        </h1>

        <div
            class="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-4
                mb-8
            "
        >
            ${gallery}
        </div>

        <p
            class="
                text-gray-500
                mb-6
            "
        >
            ${homestay.address}
        </p>

        <p
            class="
                text-gray-600
                mb-4
            "
        >
            ${homestay.ward_name},
            ${homestay.district_name},
            ${homestay.province_name}
        </p>

        <div
            class="
                bg-white
                p-6
                rounded-2xl
                shadow
            "
        >
            <h3
                class="
                    text-xl
                    font-semibold
                    mb-3
                "
            >
                Description
            </h3>

            <p>
                ${homestay.description}
            </p>
        </div>
    `;
}

function renderRooms(
    rooms
) {

    const grid =
        document.getElementById(
            "roomsGrid"
        );

    if (
        !rooms ||
        rooms.length === 0
    ) {

        grid.innerHTML = `
            <div>
                No rooms available
            </div>
        `;

        return;
    }

    grid.innerHTML =
        rooms.map(room => {

            let image =
                "https://placehold.co/600x400";

            if (
                room.images &&
                room.images.length
            ) {

                image =
                    room.images[0]
                        .image_url;

                if (
                    image.startsWith("/")
                ) {
                    image =
                        "http://127.0.0.1:8000" +
                        image;
                }
            }

            return `
                <div
                    class="
                        bg-white
                        rounded-3xl
                        overflow-hidden
                        shadow
                    "
                >

                    <img
                        src="${image}"
                        class="
                            h-52
                            w-full
                            object-cover
                        "
                    >

                    <div class="p-5">

                        <h3
                            class="
                                text-lg
                                font-bold
                                mb-2
                            "
                        >
                            ${room.name}
                        </h3>

                        <p
                            class="
                                text-gray-500
                                mb-2
                            "
                        >
                            Capacity:
                            ${room.capacity}
                            guests
                        </p>

                        <p
                            class="
                                text-rose-500
                                text-xl
                                font-bold
                                mb-4
                            "
                        >
                            ${formatPrice(
                                room.price
                            )}
                        </p>

                        <a
                            href="
                                booking.html?room=${room.id}
                            "
                            class="
                                block
                                text-center
                                bg-rose-500
                                text-white
                                py-3
                                rounded-xl
                            "
                        >
                            Book Now
                        </a>

                    </div>

                </div>
            `;
        })
        .join("");
}