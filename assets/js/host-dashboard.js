if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

loadDashboard();

async function loadDashboard() {

    try {

        const homestays =
            await apiRequest(
                "/host/homestays/"
            );

        const bookings =
            await apiRequest(
                "/host/bookings/"
            );

        const payments =
            await apiRequest(
                "/host/payments/"
            );

        let totalRooms = 0;

        for (
            const homestay
            of homestays
        ) {

            const rooms =
                await apiRequest(
                    `/host/homestays/${homestay.id}/rooms/`
                );

            totalRooms +=
                rooms.length;
        }

        renderStats(
            homestays.length,
            totalRooms,
            bookings.length,
            payments.total_revenue
        );

        renderHomestays(
            homestays
        );

        renderBookings(
            bookings
        );

    } catch (error) {

        console.error(error);
    }
}

function renderStats(
    homestays,
    rooms,
    bookings,
    revenue
) {

    document.getElementById(
        "stats"
    ).innerHTML = `

        ${card(
            "Homestays",
            homestays
        )}

        ${card(
            "Rooms",
            rooms
        )}

        ${card(
            "Bookings",
            bookings
        )}

        ${card(
            "Revenue",
            formatPrice(
                revenue
            )
        )}

    `;
}

function card(
    title,
    value
) {

    return `
        <div
            class="
                bg-white
                rounded-3xl
                shadow
                p-6
                text-center
            "
        >

            <div
                class="
                    text-gray-500
                    mb-2
                "
            >
                ${title}
            </div>

            <div
                class="
                    text-3xl
                    font-bold
                "
            >
                ${value}
            </div>

        </div>
    `;
}

function renderHomestays(
    homestays
) {

    document.getElementById(
        "homestaysContainer"
    ).innerHTML =

        homestays
        .map(
            homestay => `
                <div
                    class="
                        border
                        rounded-xl
                        p-4
                    "
                >

                    <h3
                        class="
                            font-semibold
                        "
                    >
                        ${homestay.name}
                    </h3>

                    <p
                        class="
                            text-gray-500
                        "
                    >
                        ${homestay.address}
                    </p>

                </div>
            `
        )
        .join("");
}

function renderBookings(
    bookings
) {

    document.getElementById(
        "bookingsContainer"
    ).innerHTML =

        bookings
        .slice(0, 5)
        .map(
            booking => `
                <div
                    class="
                        border
                        rounded-xl
                        p-4
                    "
                >

                    <h3
                        class="
                            font-semibold
                        "
                    >
                        Booking #${booking.id}
                    </h3>

                    <p>
                        ${booking.homestay_name}
                    </p>

                    <p
                        class="
                            text-sm
                            text-gray-500
                        "
                    >
                        ${booking.check_in}
                        →
                        ${booking.check_out}
                    </p>

                    <p
                        class="
                            text-rose-500
                            font-semibold
                        "
                    >
                        ${formatPrice(
                            booking.total_price
                        )}
                    </p>

                </div>
            `
        )
        .join("");
}