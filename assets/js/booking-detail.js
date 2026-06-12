if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

const bookingId =
    getQueryParam("id");

loadBooking();

async function loadBooking() {

    try {

        const booking =
            await apiRequest(
                `/customer/bookings/${bookingId}/`
            );

        renderBooking(
            booking
        );

    } catch (error) {

        console.error(error);
    }
}

function renderBooking(
    booking
) {

    const container =
        document.getElementById(
            "bookingDetail"
        );

    container.innerHTML = `

        <div
            class="
                flex
                justify-between
                items-center
                mb-8
            "
        >

            <h1
                class="
                    text-3xl
                    font-bold
                "
            >
                Booking #${booking.id}
            </h1>

            <span
                class="
                    px-4
                    py-2
                    rounded-full
                    bg-rose-100
                    text-rose-600
                "
            >
                ${booking.status}
            </span>

        </div>

        <div
            class="
                grid
                md:grid-cols-2
                gap-6
                mb-8
            "
        >

            <div>

                <h3
                    class="
                        text-gray-500
                    "
                >
                    Homestay
                </h3>

                <p
                    class="
                        font-semibold
                    "
                >
                    ${booking.homestay_name}
                </p>

            </div>

            <div>

                <h3
                    class="
                        text-gray-500
                    "
                >
                    Guest
                </h3>

                <p
                    class="
                        font-semibold
                    "
                >
                    ${booking.user_name}
                </p>

            </div>

            <div>

                <h3
                    class="
                        text-gray-500
                    "
                >
                    Check In
                </h3>

                <p>
                    ${booking.check_in}
                </p>

            </div>

            <div>

                <h3
                    class="
                        text-gray-500
                    "
                >
                    Check Out
                </h3>

                <p>
                    ${booking.check_out}
                </p>

            </div>

            <div>

                <h3
                    class="
                        text-gray-500
                    "
                >
                    Guests
                </h3>

                <p>
                    ${booking.total_guests}
                </p>

            </div>

            <div>

                <h3
                    class="
                        text-gray-500
                    "
                >
                    Total Price
                </h3>

                <p
                    class="
                        text-rose-500
                        font-bold
                    "
                >
                    ${formatPrice(
                        booking.total_price
                    )}
                </p>

            </div>

        </div>

        <h2
            class="
                text-2xl
                font-bold
                mb-4
            "
        >
            Rooms
        </h2>

        <div
            class="
                space-y-4
            "
        >

            ${booking.rooms.map(
                room => `
                    <div
                        class="
                            border
                            rounded-xl
                            p-4
                            flex
                            justify-between
                        "
                    >

                        <div>

                            <div
                                class="
                                    font-semibold
                                "
                            >
                                ${room.room_name}
                            </div>

                            <div
                                class="
                                    text-gray-500
                                "
                            >
                                Room ID:
                                ${room.room}
                            </div>

                        </div>

                        <div
                            class="
                                text-rose-500
                                font-semibold
                            "
                        >
                            ${formatPrice(
                                room.price
                            )}
                        </div>

                    </div>
                `
            ).join("")}

        </div>

    `;
}