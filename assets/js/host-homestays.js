if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

loadHomestays();

async function loadHomestays() {

    try {

        const homestays =
            await apiRequest(
                "/host/homestays/"
            );

        renderHomestays(
            homestays
        );

    } catch (error) {

        console.error(error);
    }
}

function renderHomestays(
    homestays
) {

    const container =
        document.getElementById(
            "homestaysContainer"
        );


    container.innerHTML =
        homestays
        .map(
            homestay => {

                let image =
                    "https://placehold.co/600x400";

                if (
                    homestay.images &&
                    homestay.images.length
                ) {

                    image =
                        homestay.images[0]
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

                        <div class="p-5">

                            <h3
                                class="
                                    text-xl
                                    font-bold
                                    mb-2
                                "
                            >
                                ${homestay.name}
                            </h3>

                            <p
                                class="
                                    text-gray-500
                                    text-sm
                                    mb-3
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
                                ${
                                    homestay.description ||
                                    "No description"
                                }
                            </p>

                            <div class="flex gap-2">

                                <a
                                    href="host-rooms.html?homestay=${homestay.id}"
                                    class="
                                        bg-blue-500
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                    "
                                >
                                    Rooms
                                </a>

                                <a
                                    href="edit-homestay.html?id=${homestay.id}"
                                    class="
                                        bg-yellow-500
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                    "
                                >
                                    Edit
                                </a>

                                <button
                                    onclick="deleteHomestay(${homestay.id})"
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
}

// delete homestay
async function deleteHomestay(id) {

    if (
        !confirm(
            "Delete this homestay?"
        )
    ) {
        return;
    }

    try {

        await apiRequest(
            `/host/homestays/${id}/`,
            "DELETE"
        );

        loadHomestays();

    } catch (error) {

        alert(error.message);
    }
}

