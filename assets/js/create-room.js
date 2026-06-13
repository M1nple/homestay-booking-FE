if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

const homestayId =
    new URLSearchParams(
        location.search
    ).get("homestay");

loadAmenities();

async function loadAmenities() {

    try {

        const amenities =
            await apiRequest(
                "/amenities/"
            );

        renderAmenities(
            amenities
        );

    } catch (error) {

        console.error(error);
    }
}

function renderAmenities(
    amenities
) {

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

document
    .getElementById(
        "roomForm"
    )
    .addEventListener(
        "submit",
        createRoom
    );

async function createRoom(
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

        const amenityIds =
            Array.from(
                document.querySelectorAll(
                    "#amenitiesContainer input:checked"
                )
            );

        amenityIds.forEach(
            item =>
                formData.append(
                    "amenity_ids",
                    item.value
                )
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
            `/host/homestays/${homestayId}/rooms/`,
            "POST",
            formData,
            true
        );

        alert(
            "Create Room Success"
        );

        location.href =
            `host-rooms.html?homestay=${homestayId}`;

    } catch (error) {

        alert(
            error.message
        );
    }
}

console.log(
    "Homestay ID:",
    homestayId
);