if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

const params =
    new URLSearchParams(
        location.search
    );

const homestayId =
    params.get(
        "homestay"
    );

const roomId =
    params.get(
        "id"
    );

let roomData =
    null;

init();

async function init() {

    await loadAmenities();

    await loadRoom();
}

async function loadAmenities() {

    const amenities =
        await apiRequest(
            "/amenities/"
        );

    document.getElementById(
        "amenitiesContainer"
    ).innerHTML =

        amenities
        .map(
            amenity => `
                <label
                    class="
                        flex
                        gap-2
                        items-center
                    "
                >

                    <input
                        type="checkbox"
                        value="${amenity.id}"
                    >

                    ${amenity.name}

                </label>
            `
        )
        .join("");
}

async function loadRoom() {

    roomData =
        await apiRequest(
            `/host/homestays/${homestayId}/rooms/${roomId}/`
        );

    console.log(roomData);

    document.getElementById(
        "name"
    ).value =
        roomData.name;

    document.getElementById(
        "price"
    ).value =
        roomData.price;

    document.getElementById(
        "capacity"
    ).value =
        roomData.capacity;

    document.getElementById(
        "status"
    ).value =
        roomData.status;

    document.getElementById(
        "description"
    ).value =
        roomData.description || "";

    renderImages();

    checkAmenities();
}

function renderImages() {

    document.getElementById(
        "currentImages"
    ).innerHTML =

        roomData.images
        .map(
            image => `
                <img
                    src="${image.image_url}"
                    class="
                        w-full
                        h-32
                        rounded-xl
                        object-cover
                    "
                >
            `
        )
        .join("");
}

function checkAmenities() {

    const selected =
        roomData.amenities.map(
            item => item.id
        );

    document
        .querySelectorAll(
            "#amenitiesContainer input"
        )
        .forEach(
            checkbox => {

                checkbox.checked =
                    selected.includes(
                        Number(
                            checkbox.value
                        )
                    );
            }
        );
}

document
    .getElementById(
        "roomForm"
    )
    .addEventListener(
        "submit",
        updateRoom
    );

async function updateRoom(
    e
) {

    e.preventDefault();

    try {

        const formData =
            new FormData();

        formData.append(
            "name",
            document.getElementById(
                "name"
            ).value
        );

        formData.append(
            "price",
            document.getElementById(
                "price"
            ).value
        );

        formData.append(
            "capacity",
            document.getElementById(
                "capacity"
            ).value
        );

        formData.append(
            "status",
            document.getElementById(
                "status"
            ).value
        );

        formData.append(
            "description",
            document.getElementById(
                "description"
            ).value
        );

        document
            .querySelectorAll(
                "#amenitiesContainer input:checked"
            )
            .forEach(
                checkbox => {

                    formData.append(
                        "amenity_ids",
                        checkbox.value
                    );
                }
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
            `/host/homestays/${homestayId}/rooms/${roomId}/`,
            "PUT",
            formData,
            true
        );

        alert(
            "Update Room Success"
        );

        location.href =
            `host-rooms.html?homestay=${homestayId}`;

    } catch (error) {

        alert(
            error.message
        );
    }
}