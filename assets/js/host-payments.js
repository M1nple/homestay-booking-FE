if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

loadPayments();

async function loadPayments() {

    try {

        const data =
            await apiRequest(
                "/host/payments/"
            );

        renderSummary(
            data
        );

        renderPayments(
            data.payments
        );

    } catch (error) {

        console.error(
            error
        );
    }
}

function renderSummary(
    data
) {

    document.getElementById(
        "summary"
    ).innerHTML =

        `
        <div
            class="
                bg-white
                p-6
                rounded-3xl
                shadow
            "
        >
            <h3
                class="
                    text-gray-500
                    mb-2
                "
            >
                Total Revenue
            </h3>

            <p
                class="
                    text-3xl
                    font-bold
                    text-rose-500
                "
            >
                ${formatPrice(
                    data.total_revenue
                )}
            </p>
        </div>

        <div
            class="
                bg-white
                p-6
                rounded-3xl
                shadow
            "
        >
            <h3
                class="
                    text-gray-500
                    mb-2
                "
            >
                Transactions
            </h3>

            <p
                class="
                    text-3xl
                    font-bold
                "
            >
                ${
                    data.total_transactions
                }
            </p>
        </div>
    `;
}

function renderPayments(
    payments
) {

    const container =
        document.getElementById(
            "paymentsContainer"
        );

    if (!payments.length) {

        container.innerHTML =
            `
            <div
                class="
                    bg-white
                    p-8
                    rounded-3xl
                    text-center
                "
            >
                No payment data
            </div>
            `;

        return;
    }

    container.innerHTML =
        JSON.stringify(
            payments,
            null,
            2
        );
}   