if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

loadBookings();

async function loadBookings() {

    const container =
        document.getElementById(
            "bookingsContainer"
        );

    try {

        container.innerHTML = `
            <div
                class="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow
                    text-center
                "
            >
                Loading...
            </div>
        `;

        const bookings =
            await apiRequest(
                "/customer/bookings/"
            );

        console.log(
            "BOOKINGS:",
            bookings
        );

        if (
            !bookings ||
            bookings.length === 0
        ) {

            container.innerHTML = `
                <div
                    class="
                        bg-white
                        p-6
                        rounded-2xl
                        shadow
                        text-center
                    "
                >
                    No bookings found
                </div>
            `;

            return;
        }

        container.innerHTML =
            bookings
            .map(
                booking => {

                    let statusColor =
                        "bg-gray-100 text-gray-700";

                    if (
                        booking.status ===
                        "PENDING"
                    ) {

                        statusColor =
                            "bg-yellow-100 text-yellow-700";
                    }

                    else if (
                        booking.status ===
                        "CONFIRMED"
                    ) {

                        statusColor =
                            "bg-green-100 text-green-700";
                    }

                    else if (
                        booking.status ===
                        "CANCELLED"
                    ) {

                        statusColor =
                            "bg-red-100 text-red-700";
                    }

                    return `

                    <div
                        class="
                            bg-white
                            rounded-2xl
                            shadow
                            p-6
                        "
                    >

                        <div
                            class="
                                flex
                                justify-between
                                items-start
                                mb-5
                            "
                        >

                            <div>

                                <h3
                                    class="
                                        text-xl
                                        font-bold
                                    "
                                >
                                    ${booking.homestay_name}
                                </h3>

                                <p
                                    class="
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    Booking #${booking.id}
                                </p>

                            </div>

                            <span
                                class="
                                    px-4
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-medium
                                    ${statusColor}
                                "
                            >
                                ${booking.status}
                            </span>

                        </div>

                        <div
                            class="
                                grid
                                md:grid-cols-2
                                gap-4
                                mb-5
                            "
                        >

                            <div>
                                <strong>
                                    Check In:
                                </strong>
                                ${booking.check_in}
                            </div>

                            <div>
                                <strong>
                                    Check Out:
                                </strong>
                                ${booking.check_out}
                            </div>

                            <div>
                                <strong>
                                    Guests:
                                </strong>
                                ${booking.total_guests}
                            </div>

                            <div>
                                <strong>
                                    Total Price:
                                </strong>
                                ${Number(
                                    booking.total_price
                                ).toLocaleString()}
                                VND
                            </div>

                        </div>

                        <div>

                            <h4
                                class="
                                    font-semibold
                                    mb-3
                                "
                            >
                                Rooms
                            </h4>

                            ${
                                (booking.rooms || [])
                                .map(
                                    room => `

                                    <div
                                        class="
                                            flex
                                            justify-between
                                            items-center
                                            border-b
                                            py-3
                                        "
                                    >

                                        <div
                                            class="
                                                text-gray-600
                                            "
                                        >
                                            • ${room.room_name}
                                            (
                                                ${Number(
                                                    room.price
                                                ).toLocaleString()}
                                                VND
                                            )
                                        </div>

                                        <a
                                            href="create-review.html?booking=${booking.id}&room=${room.room}"
                                            class="
                                                bg-yellow-500
                                                text-white
                                                px-3
                                                py-1
                                                rounded-lg
                                                text-sm
                                            "
                                        >
                                            Review
                                        </a>

                                    </div>

                                `
                                )
                                .join("")
                            }

                            ${
                                ["PENDING", "CONFIRMED"]
                                .includes(booking.status)
                                ?
                                `
                                <button
                                    onclick="cancelBooking(${booking.id})"
                                    class="
                                        mt-4
                                        bg-red-500
                                        hover:bg-red-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                    "
                                >
                                    Cancel Booking
                                </button>
                                `
                                :
                                ""
                            }

                        </div>

                    </div>

                `;
                }
            )
            .join("");

    }

    catch (error) {

        console.error(
            "BOOKING ERROR:",
            error
        );

        container.innerHTML = `
            <div
                class="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow
                    text-red-500
                "
            >
                ${error.message}
            </div>
        `;
    }
}

async function cancelBooking(
    bookingId
) {

    const confirmed =
        confirm(
            "Are you sure you want to cancel this booking?"
        );

    if (!confirmed) {
        return;
    }

    try {

        await apiRequest(
            `/customer/bookings/${bookingId}/cancel/`,
            "PATCH"
        );

        alert(
            "Booking cancelled successfully"
        );

        await loadBookings();

    }

    catch (error) {

        console.error(error);

        alert(
            error.message
        );
    }
}