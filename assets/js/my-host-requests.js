if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

loadRequests();

async function loadRequests() {

    try {

        const requests =
            await apiRequest(
                "/customer/host-requests/"
            );

        renderRequests(
            requests
        );

    } catch (error) {

        console.error(
            error
        );
    }
}

function renderRequests(
    requests
) {

    const container =
        document.getElementById(
            "requestsContainer"
        );

    if (
        !requests.length
    ) {

        container.innerHTML = `
            <div
                class="
                    bg-white
                    p-10
                    rounded-3xl
                    text-center
                "
            >
                No Host Requests
            </div>
        `;

        return;
    }

    container.innerHTML =
        requests
        .map(
            request => `

            <div
                class="
                    bg-white
                    rounded-3xl
                    p-6
                    shadow
                "
            >

                <div
                    class="
                        flex
                        justify-between
                        mb-4
                    "
                >

                    <h2
                        class="
                            text-2xl
                            font-bold
                        "
                    >
                        ${request.business_name}
                    </h2>

                    <span
                        class="
                            px-4
                            py-2
                            rounded-full
                            text-sm
                        "
                    >
                        ${request.status}
                    </span>

                </div>

                <p
                    class="
                        text-gray-600
                        mb-3
                    "
                >
                    Identity:
                    ${request.identity_number}
                </p>

                <p
                    class="
                        text-gray-600
                        mb-3
                    "
                >
                    ${
                        request.description ||
                        "No description"
                    }
                </p>

                <p
                    class="
                        text-gray-500
                        mb-3
                    "
                >
                    Reason:
                    ${
                        request.reason ||
                        "-"
                    }
                </p>

                ${
                    request.rejection_reason

                    ?

                    `
                    <div
                        class="
                            bg-red-50
                            text-red-600
                            p-4
                            rounded-xl
                        "
                    >
                        Rejection Reason:
                        ${request.rejection_reason}
                    </div>
                    `

                    :

                    ""
                }

                <div
                    class="
                        text-sm
                        text-gray-400
                        mt-4
                    "
                >
                    Created:
                    ${new Date(
                        request.created_at
                    ).toLocaleString()}
                </div>

            </div>

        `
        )
        .join("");
}