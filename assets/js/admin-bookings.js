if (!isAuthenticated()) {
    location.href = "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

loadBookings();

async function loadBookings() {

    try {

        const bookings =
            await apiRequest(
                "/admin/bookings/"
            );

        document.getElementById(
            "bookingsTable"
        ).innerHTML =

            bookings.map(
                booking => `

                    <tr class="border-b">

                        <td class="p-4">
                            ${booking.id}
                        </td>

                        <td class="p-4">
                            ${booking.user_name || "-"}
                        </td>

                        <td class="p-4">
                            ${booking.homestay_name}
                        </td>

                        <td class="p-4">
                            ${booking.total_guests}
                        </td>

                        <td class="p-4">
                            ${formatPrice(
                                booking.total_price
                            )}
                        </td>

                        <td class="p-4">
                            ${statusBadge(
                                booking.status
                            )}
                        </td>

                        <td class="p-4">

                            ${
                                booking.status ===
                                "REFUND_PENDING"

                                ?

                                `
                                <button
                                    onclick="approveRefund(${booking.id})"
                                    class="
                                        bg-green-500
                                        text-white
                                        px-3
                                        py-2
                                        rounded-lg
                                        text-sm
                                    "
                                >
                                    Approve Refund
                                </button>
                                `

                                :

                                "-"
                            }

                        </td>

                    </tr>

                `
            ).join("");

    } catch (error) {

        console.error(error);

        alert(
            "Failed to load bookings"
        );
    }
}

function statusBadge(
    status
) {

    const color = {

        PENDING:
            "bg-yellow-100 text-yellow-700",

        CONFIRMED:
            "bg-blue-100 text-blue-700",

        COMPLETED:
            "bg-green-100 text-green-700",

        CANCELLED:
            "bg-red-100 text-red-700",

        EXPIRED:
            "bg-gray-100 text-gray-700",

        REFUND_PENDING:
            "bg-orange-100 text-orange-700"

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

async function approveRefund(
    bookingId
) {

    const confirmed =
        confirm(
            "Approve refund request?"
        );

    if (!confirmed) {
        return;
    }

    try {

        await apiRequest(
            `/admin/bookings/${bookingId}/approve-refund/`,
            "PATCH"
        );

        alert(
            "Refund approved successfully"
        );

        loadBookings();

    } catch (error) {

        console.error(error);

        alert(
            error.message
        );
    }
}