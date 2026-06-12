document.getElementById(
    "navbar"
).innerHTML = renderNavbar();

loadBookings();

async function loadBookings() {

    try {

        const bookings =
            await apiRequest(
                "/customer/bookings/"
            );

        console.log(bookings);

        const container =
            document.getElementById(
                "bookingsContainer"
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
            bookings.map(
                booking => `
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
                            mb-4
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
                                "
                            >
                                <a
                                    href="
                                        booking-detail.html?id=${booking.id}
                                    "
                                    class="
                                        block
                                    "
                                >
                            </p>

                        </div>

                        <span
                            class="
                                px-4
                                py-1
                                rounded-full
                                bg-yellow-100
                                text-yellow-700
                                text-sm
                                font-medium
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
                        "
                    >

                        <div>
                            <strong>Check In:</strong>
                            ${booking.check_in}
                        </div>

                        <div>
                            <strong>Check Out:</strong>
                            ${booking.check_out}
                        </div>

                        <div>
                            <strong>Guests:</strong>
                            ${booking.total_guests}
                        </div>

                        <div>
                            <strong>Total Price:</strong>
                            ${Number(
                                booking.total_price
                            ).toLocaleString()} VND
                        </div>

                    </div>

                    <div class="mt-5">

                        <h4
                            class="
                                font-semibold
                                mb-2
                            "
                        >
                            Rooms
                        </h4>

                        ${
                            booking.rooms.map(
                                room => `
                                <div
                                    class="
                                        text-gray-600
                                        mb-1
                                    "
                                >
                                    • ${room.room_name}
                                    (${Number(room.price).toLocaleString()} VND)
                                </div>
                            `
                            ).join("")
                        }

                    </div>

                </div>
            `
            ).join("");

    } catch (error) {

        console.error(error);

        document.getElementById(
            "bookingsContainer"
        ).innerHTML = `
            <div
                class="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow
                    text-red-500
                "
            >
                Failed to load bookings
            </div>
        `;
    }
}