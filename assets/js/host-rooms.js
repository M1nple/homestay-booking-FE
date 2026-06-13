if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

const homestayId =
    getQueryParam(
        "homestay"
    );

document.getElementById(
    "createRoomBtn"
).href =
    `create-room.html?homestay=${homestayId}`;

loadRooms();

async function loadRooms() {

    try {

        const homestays =
            await apiRequest(
                "/host/homestays/"
            );

        const homestay =
            homestays.find(
                h =>
                    h.id ==
                    homestayId
            );

        if (homestay) {

            document.getElementById(
                "pageTitle"
            ).innerText =
                homestay.name +
                " Rooms";
        }

        const rooms =
            await apiRequest(
                `/host/homestays/${homestayId}/rooms/`
            );

        renderRooms(
            rooms
        );

    } catch (error) {

        console.error(
            error
        );
    }
}

function renderRooms(
    rooms
) {

    const container =
        document.getElementById(
            "roomsContainer"
        );

    container.innerHTML =
        rooms
        .map(
            room => {

                let image =
                    "https://placehold.co/600x400";

                if (
                    room.images &&
                    room.images.length
                ) {

                    image =
                        room.images[0]
                        .image_url;
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
                                w-full
                                h-56
                                object-cover
                            "
                        >

                        <div
                            class="p-5"
                        >

                            <div
                                class="
                                    flex
                                    justify-between
                                    items-center
                                    mb-3
                                "
                            >

                                <h3
                                    class="
                                        text-xl
                                        font-bold
                                    "
                                >
                                    ${room.name}
                                </h3>

                                <span
                                    class="
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        bg-green-100
                                        text-green-600
                                    "
                                >
                                    ${room.status}
                                </span>

                            </div>

                            <p
                                class="
                                    text-rose-500
                                    text-xl
                                    font-bold
                                    mb-3
                                "
                            >
                                ${formatPrice(
                                    room.price
                                )}
                            </p>

                            <p
                                class="
                                    text-gray-600
                                    mb-2
                                "
                            >
                                Capacity:
                                ${room.capacity}
                            </p>

                            <p
                                class="
                                    text-gray-500
                                    text-sm
                                    mb-4
                                "
                            >
                                ${
                                    room.description ||
                                    "No description"
                                }
                            </p>

                            <div
                                class="
                                    flex
                                    flex-wrap
                                    gap-2
                                    mb-4
                                "
                            >

                                ${
                                    room.amenities
                                    .map(
                                        amenity => `
                                            <span
                                                class="
                                                    bg-gray-100
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-sm
                                                "
                                            >
                                                ${amenity.name}
                                            </span>
                                        `
                                    )
                                    .join("")
                                }

                            </div>

                            <div
                                class="
                                    flex
                                    gap-3
                                "
                            >

                                <a
                                    href="edit-room.html?homestay=${homestayId}&id=${room.id}"
                                    class="
                                        bg-blue-500
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                    "
                                >
                                    Edit
                                </a>

                                <button
                                    onclick="
                                        deleteRoom(
                                            ${room.id}
                                        )
                                    "
                                    class="
                                        bg-red-500
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                `;
            }
        )
        .join("");

console.log(room);
}

async function deleteRoom(
    roomId
) {

    if (
        !confirm(
            "Delete this room?"
        )
    ) {
        return;
    }

    try {

        await apiRequest(
            `/host/homestays/${homestayId}/rooms/${roomId}/`,
            "DELETE"
        );

        loadRooms();

    } catch (error) {

        alert(
            error.message
        );
    }
}