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

    try {

        const bookings =
            await apiRequest(
                "/host/bookings/"
            );

        renderBookings(
            bookings
        );

    } catch (error) {

        console.error(
            error
        );

        alert(
            error.message
        );
    }
}

function renderBookings(
    bookings
) {

    const container =
        document.getElementById(
            "bookingsContainer"
        );

    if (!bookings.length) {

        container.innerHTML =
            `
            <div
                class="
                    bg-white
                    p-8
                    rounded-2xl
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

                const rooms =
                    booking.rooms
                    .map(
                        room =>
                            room.room_name
                    )
                    .join(", ");

                return `
                    <div
                        class="
                            bg-white
                            rounded-3xl
                            shadow
                            p-6
                        "
                    >

                        <div
                            class="
                                flex
                                justify-between
                                items-center
                                mb-4
                            "
                        >

                            <h2
                                class="
                                    text-2xl
                                    font-bold
                                "
                            >
                                Booking #${booking.id}
                            </h2>

                            <span
                                class="
                                    px-4
                                    py-2
                                    rounded-full
                                    bg-yellow-100
                                    text-yellow-700
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
                                <p>
                                    <strong>
                                        Customer:
                                    </strong>

                                    ${
                                        booking.user_name ||
                                        "Guest"
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Homestay:
                                    </strong>

                                    ${
                                        booking.homestay_name
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Rooms:
                                    </strong>

                                    ${rooms}
                                </p>
                            </div>

                            <div>

                                <p>
                                    <strong>
                                        Check In:
                                    </strong>

                                    ${
                                        booking.check_in
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Check Out:
                                    </strong>

                                    ${
                                        booking.check_out
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Guests:
                                    </strong>

                                    ${
                                        booking.total_guests
                                    }
                                </p>

                                <p
                                    class="
                                        text-rose-500
                                        font-bold
                                        text-xl
                                    "
                                >
                                    ${formatPrice(
                                        booking.total_price
                                    )}
                                </p>

                            </div>

                        </div>

                    </div>
                `;
            }
        )
        .join("");
}