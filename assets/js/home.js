document.addEventListener(
    "DOMContentLoaded",
    async () => {

        document.getElementById(
            "navbar"
        ).innerHTML =
            renderNavbar();

        await loadLocations();

        document
            .getElementById(
                "searchBtn"
            )
            .addEventListener(
                "click",
                searchHomestays
            );

        await loadHomestays();
    }
);

// ======================
// LOAD HOMESTAYS
// ======================

async function loadHomestays(
    query = ""
) {

    const grid =
        document.getElementById(
            "homestaysGrid"
        );

    try {

        grid.innerHTML = `
            <div class="
                col-span-full
                text-center
                py-10
            ">
                Loading...
            </div>
        `;

        const homestays =
            await apiRequest(
                `/homestays/${query}`
            );

        renderHomestays(
            homestays
        );

    }

    catch (error) {

        console.error(
            error
        );

        grid.innerHTML = `
            <div class="
                col-span-full
                text-center
                text-red-500
                py-10
            ">
                Failed to load homestays
            </div>
        `;
    }
}

// ======================
// RENDER
// ======================

function renderHomestays(
    homestays
) {

    const grid =
        document.getElementById(
            "homestaysGrid"
        );

    if (
        !homestays ||
        !homestays.length
    ) {

        grid.innerHTML = `
            <div class="
                col-span-full
                text-center
                py-10
            ">
                No homestays found
            </div>
        `;

        return;
    }

    grid.innerHTML =
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

                    if (
                        image.startsWith("/")
                    ) {

                        image =
                            API_BASE_URL +
                            image;
                    }
                }

                return `
                    <div
                        class="
                            bg-white
                            rounded-3xl
                            overflow-hidden
                            shadow-sm
                            hover:shadow-xl
                            transition
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
                                    text-lg
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
                                    mb-2
                                "
                            >
                                ${homestay.address}
                            </p>

                            <p
                                class="
                                    text-gray-400
                                    text-sm
                                    mb-4
                                "
                            >
                                ${homestay.ward_name},
                                ${homestay.district_name},
                                ${homestay.province_name}
                            </p>

                            <a
                                href="homestay-detail.html?id=${homestay.id}"
                                class="
                                    text-rose-500
                                    font-medium
                                "
                            >
                                View Details →
                            </a>

                        </div>

                    </div>
                `;
            }
        )
        .join("");
}

// ======================
// SEARCH
// ======================

async function searchHomestays() {

    const params =
        new URLSearchParams();

    const search =
        document.getElementById(
            "search"
        ).value;

    const guests =
        document.getElementById(
            "guests"
        ).value;

    const minPrice =
        document.getElementById(
            "minPrice"
        ).value;

    const maxPrice =
        document.getElementById(
            "maxPrice"
        ).value;

    const ordering =
        document.getElementById(
            "ordering"
        ).value;

    if (search)
        params.append(
            "search",
            search
        );

    if (guests)
        params.append(
            "guests",
            guests
        );

    if (minPrice)
        params.append(
            "min_price",
            minPrice
        );

    if (maxPrice)
        params.append(
            "max_price",
            maxPrice
        );

    if (ordering)
        params.append(
            "ordering",
            ordering
        );

    await loadHomestays(
        `?${params.toString()}`
    );
}

// ======================
// LOCATION
// ======================

async function loadLocations() {

    const provinces =
        await apiRequest(
            "/locations/provinces/"
        );

    const provinceSelect =
        document.getElementById(
            "province"
        );

    if (!provinceSelect)
        return;

    provinceSelect.innerHTML =
        `
        <option value="">
            All Provinces
        </option>
        ` +
        provinces
        .map(
            province => `
                <option value="${province.id}">
                    ${province.name}
                </option>
            `
        )
        .join("");

    loadDistricts();
}

document
    .getElementById(
        "province"
    )
    ?.addEventListener(
        "change",
        loadDistricts
    );

async function loadDistricts() {

    const provinceId =
        document.getElementById(
            "province"
        ).value;

    const districts =
        await apiRequest(
            "/locations/districts/"
        );

    const districtSelect =
        document.getElementById(
            "district"
        );

    districtSelect.innerHTML =
        `
        <option value="">
            All Districts
        </option>
        `;

    districts
        .filter(
            district =>
                !provinceId ||
                district.province ==
                provinceId
        )
        .forEach(
            district => {

                districtSelect.innerHTML += `
                    <option value="${district.id}">
                        ${district.name}
                    </option>
                `;
            }
        );

    loadWards();
}

document
    .getElementById(
        "district"
    )
    ?.addEventListener(
        "change",
        loadWards
    );

async function loadWards() {

    const districtId =
        document.getElementById(
            "district"
        ).value;

    const wards =
        await apiRequest(
            "/locations/wards/"
        );

    const wardSelect =
        document.getElementById(
            "ward"
        );

    wardSelect.innerHTML =
        `
        <option value="">
            All Wards
        </option>
        `;

    wards
        .filter(
            ward =>
                !districtId ||
                ward.district ==
                districtId
        )
        .forEach(
            ward => {

                wardSelect.innerHTML += `
                    <option value="${ward.id}">
                        ${ward.name}
                    </option>
                `;
            }
        );
}