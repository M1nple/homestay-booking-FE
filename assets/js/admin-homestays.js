if (!isAuthenticated()) {
    location.href = "login.html";
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
                "/admin/homestays/"
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

    document.getElementById(
        "homestaysTable"
    ).innerHTML =

        homestays.map(
            homestay => `

                <tr
                    class="
                        border-b
                    "
                >

                    <td class="p-4">
                        ${homestay.id}
                    </td>

                    <td class="p-4">
                        ${homestay.name}
                    </td>

                    <td class="p-4">
                        ${homestay.owner_name}
                    </td>

                    <td class="p-4">
                        ${homestay.address}
                    </td>

                    <td class="p-4">
                        ${new Date(
                            homestay.created_at
                        ).toLocaleDateString()}
                    </td>

                    <td class="p-4">

                        ${
                            homestay.deleted_at
                            ?
                            `
                            <span
                                class="
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-red-100
                                    text-red-600
                                "
                            >
                                Deleted
                            </span>
                            `
                            :
                            `
                            <span
                                class="
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-green-100
                                    text-green-600
                                "
                            >
                                Active
                            </span>
                            `
                        }

                    </td>

                </tr>

            `
        ).join("");
}