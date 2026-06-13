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
    ).get("id");

let homestayData =
    null;

init();

async function init() {

    try {

        await loadLocations();

        await loadHomestay();

    } catch (error) {

        console.error(error);

        alert(
            error.message
        );
    }
}

async function loadHomestay() {

    homestayData =
        await apiRequest(
            `/host/homestays/${homestayId}/`
        );

    document.getElementById(
        "name"
    ).value =
        homestayData.name;

    document.getElementById(
        "address"
    ).value =
        homestayData.address;

    document.getElementById(
        "description"
    ).value =
        homestayData.description || "";

    document.getElementById(
        "province"
    ).value =
        homestayData.province;

    await loadDistricts();

    document.getElementById(
        "district"
    ).value =
        homestayData.district;

    await loadWards();

    document.getElementById(
        "ward"
    ).value =
        homestayData.ward;

    renderImages();
}

function renderImages() {

    const container =
        document.getElementById(
            "currentImages"
        );

    container.innerHTML =
        homestayData.images
        .map(
            image => `
                <img
                    src="${image.image_url}"
                    class="
                        w-full
                        h-32
                        object-cover
                        rounded-xl
                    "
                >
            `
        )
        .join("");
}

async function loadLocations() {

    const provinces =
        await apiRequest(
            "/locations/provinces/"
        );

    document.getElementById(
        "province"
    ).innerHTML =

        provinces
        .map(
            province => `
                <option
                    value="${province.id}"
                >
                    ${province.name}
                </option>
            `
        )
        .join("");
}

document
    .getElementById(
        "province"
    )
    .addEventListener(
        "change",
        loadDistricts
    );

async function loadDistricts() {

    const provinceId =
        Number(
            document.getElementById(
                "province"
            ).value
        );

    const districts =
        await apiRequest(
            "/locations/districts/"
        );

    const filtered =
        districts.filter(
            district =>
                district.province ===
                provinceId
        );

    document.getElementById(
        "district"
    ).innerHTML =

        filtered
        .map(
            district => `
                <option
                    value="${district.id}"
                >
                    ${district.name}
                </option>
            `
        )
        .join("");

    await loadWards();
}

document
    .getElementById(
        "district"
    )
    .addEventListener(
        "change",
        loadWards
    );

async function loadWards() {

    const districtId =
        Number(
            document.getElementById(
                "district"
            ).value
        );

    const wards =
        await apiRequest(
            "/locations/wards/"
        );

    const filtered =
        wards.filter(
            ward =>
                ward.district ===
                districtId
        );

    document.getElementById(
        "ward"
    ).innerHTML =

        filtered
        .map(
            ward => `
                <option
                    value="${ward.id}"
                >
                    ${ward.name}
                </option>
            `
        )
        .join("");
}

document
    .getElementById(
        "homestayForm"
    )
    .addEventListener(
        "submit",
        updateHomestay
    );

async function updateHomestay(
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
            "address",
            document.getElementById(
                "address"
            ).value
        );

        formData.append(
            "description",
            document.getElementById(
                "description"
            ).value
        );

        formData.append(
            "province",
            document.getElementById(
                "province"
            ).value
        );

        formData.append(
            "district",
            document.getElementById(
                "district"
            ).value
        );

        formData.append(
            "ward",
            document.getElementById(
                "ward"
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
            `/host/homestays/${homestayId}/`,
            "PUT",
            formData,
            true
        );

        alert(
            "Update Homestay Success"
        );

        location.href =
            "host-homestays.html";

    } catch (error) {

        console.error(error);

        alert(
            error.message
        );
    }
}