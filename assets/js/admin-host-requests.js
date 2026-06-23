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
        "statusFilter"
    )
    .addEventListener(
        "change",
        loadRequests
    );

loadRequests();

async function loadRequests() {

    try {

        let url =
            "/admin/host-requests/";

        const status =
            document.getElementById(
                "statusFilter"
            ).value;

        if (status) {

            url +=
                `?status=${status}`;
        }

        const requests =
            await apiRequest(
                url
            );

        renderRequests(
            requests
        );

    } catch (error) {

        console.error(error);
    }
}

function renderRequests(
    requests
) {

    document.getElementById(
        "requestsTable"
    ).innerHTML =

        requests
        .map(
            request => `

            <tr
                class="
                    border-b
                "
            >

                <td class="p-4">
                    ${request.id}
                </td>

                <td class="p-4">
                    ${request.business_name}
                </td>

                <td class="p-4">
                    ${request.identity_number}
                </td>

                <td class="p-4">
                    ${request.status}
                </td>

                <td class="p-4">
                    ${new Date(
                        request.created_at
                    ).toLocaleDateString()}
                </td>

                <td class="p-4">

                    ${
                        request.status ===
                        "PENDING"

                        ?

                        `
                        <button
                            onclick="
                                approveRequest(
                                    ${request.id}
                                )
                            "
                            class="
                                bg-green-500
                                text-white
                                px-3
                                py-2
                                rounded
                                mr-2
                            "
                        >
                            Approve
                        </button>

                        <button
                            onclick="
                                rejectRequest(
                                    ${request.id}
                                )
                            "
                            class="
                                bg-red-500
                                text-white
                                px-3
                                py-2
                                rounded
                            "
                        >
                            Reject
                        </button>
                        `

                        :

                        "-"
                    }

                </td>

            </tr>

        `
        )
        .join("");
}

async function approveRequest(
    id
) {

    if (
        !confirm(
            "Approve this request?"
        )
    ) {
        return;
    }

    try {

        await apiRequest(
            `/admin/host-requests/${id}/approve/`,
            "POST"
        );

        alert(
            "Approved"
        );

        loadRequests();

    } catch (error) {

        alert(
            error.message
        );
    }
}

async function rejectRequest(
    id
) {

    const reason =
        prompt(
            "Rejection reason"
        );

    if (!reason) {
        return;
    }

    try {

        await apiRequest(
            `/admin/host-requests/${id}/reject/`,
            "POST",
            {
                rejection_reason:
                    reason
            }
        );

        alert(
            "Rejected"
        );

        loadRequests();

    } catch (error) {

        alert(
            error.message
        );
    }
}