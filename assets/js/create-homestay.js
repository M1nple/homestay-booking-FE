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
        "homestayForm"
    )
    .addEventListener(
        "submit",
        createHomestay
    );


async function createHomestay(e) {

    e.preventDefault();

    try {

        const formData =
            new FormData();

        formData.append(
            "name",
            document.getElementById("name").value
        );

        formData.append(
            "address",
            document.getElementById("address").value
        );

        formData.append(
            "description",
            document.getElementById("description").value
        );

        formData.append(
            "province",
            document.getElementById("province").value
        );

        formData.append(
            "district",
            document.getElementById("district").value
        );

        formData.append(
            "ward",
            document.getElementById("ward").value
        );

        const files =
            document.getElementById("images").files;

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

        const result =
            await apiRequest(
                "/host/homestays/",
                "POST",
                formData,
                true
            );

        console.log(result);

        alert(
            "Create Homestay Success"
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

// load provinces
loadLocations();

async function loadLocations() {

    const provinces =
        await apiRequest(
            "/locations/provinces/"
        );

    const provinceSelect =
        document.getElementById(
            "province"
        );

    provinceSelect.innerHTML =
        provinces
        .map(
            p => `
                <option
                    value="${p.id}"
                >
                    ${p.name}
                </option>
            `
        )
        .join("");

    loadDistricts();
}

//  load districts
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
            d =>
                d.province ===
                provinceId
        );

    document.getElementById(
        "district"
    ).innerHTML =

        filtered
        .map(
            d => `
                <option
                    value="${d.id}"
                >
                    ${d.name}
                </option>
            `
        )
        .join("");

    loadWards();
}

// Load wards:
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
            w =>
                w.district ===
                districtId
        );

    document.getElementById(
        "ward"
    ).innerHTML =

        filtered
        .map(
            w => `
                <option
                    value="${w.id}"
                >
                    ${w.name}
                </option>
            `
        )
        .join("");
}

