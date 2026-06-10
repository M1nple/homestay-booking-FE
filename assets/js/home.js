document.addEventListener("DOMContentLoaded", async () => {

    document.getElementById("navbar").innerHTML =
        renderNavbar();

    await loadHomestays();

});

async function loadHomestays() {

    const grid =
        document.getElementById(
            "homestaysGrid"
        );

    try {

        grid.innerHTML = `
            <div class="col-span-full text-center py-10">
                Loading...
            </div>
        `;

        const homestays =
            await apiRequest(
                "/homestays/"
            );

        if (!homestays.length) {

            grid.innerHTML = `
                <div class="col-span-full text-center py-10">
                    No homestays found
                </div>
            `;

            return;
        }

        grid.innerHTML =
            homestays.map(homestay => {

                let image =
                    "https://placehold.co/600x400";

                if (
                    homestay.images &&
                    homestay.images.length > 0
                ) {

                    image =
                        homestay.images[0]
                            .image_url;

                    if (
                        image &&
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
                            shadow-sm
                            hover:shadow-xl
                            transition-all
                            duration-300
                            hover:-translate-y-1
                        "
                    >

                        <img
                            src="${image}"
                            alt="${homestay.name}"
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
                                    mb-3
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
                                href="
                                    homestay-detail.html?id=${homestay.id}
                                "
                                class="
                                    inline-flex
                                    items-center
                                    text-rose-500
                                    font-medium
                                "
                            >
                                View Details →
                            </a>

                        </div>

                    </div>
                `;
            })
            .join("");

    } catch (error) {

        console.error(error);

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