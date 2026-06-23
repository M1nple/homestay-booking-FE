if (!isAuthenticated()) {
    location.href = "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

loadPayments();

async function loadPayments() {

    const payments =
        await apiRequest(
            "/admin/payments/"
        );

    document.getElementById(
        "paymentsTable"
    ).innerHTML =

        payments.map(
            payment => `

                <tr
                    class="
                        border-b
                    "
                >

                    <td class="p-4">
                        ${payment.id}
                    </td>

                    <td class="p-4">
                        #${payment.booking_id}
                    </td>

                    <td class="p-4">
                        ${payment.customer}
                    </td>

                    <td class="p-4">
                        ${formatPrice(
                            payment.amount
                        )}
                    </td>

                    <td class="p-4">
                        ${payment.method}
                    </td>

                    <td class="p-4">
                        ${paymentBadge(
                            payment.status
                        )}
                    </td>

                </tr>

            `
        ).join("");
}

function paymentBadge(
    status
) {

    const color = {

        SUCCESS:
            "bg-green-100 text-green-700",

        FAILED:
            "bg-red-100 text-red-700",

        PENDING:
            "bg-yellow-100 text-yellow-700"

    };

    return `
        <span
            class="
                px-3
                py-1
                rounded-full
                ${color[status] || "bg-gray-100 text-gray-700"}
            "
        >
            ${status}
        </span>
    `;
}