if (
    !isAuthenticated()
) {

    window.location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML = renderNavbar();

const roomId =
    getQueryParam("room");

let roomData = null;

loadRoom();

async function loadRoom() {

    try {

        roomData =
            await apiRequest(
                `/rooms/${roomId}/`
            );

        renderRoom();

    } catch (error) {

        console.error(error);

    }
}

function renderRoom() {

    const container =
        document.getElementById(
            "roomInfo"
        );

    let image =
        "https://placehold.co/600x400";

    if (
        roomData.images &&
        roomData.images.length
    ) {

        image =
            roomData.images[0]
                .image_url;

        if (
            image.startsWith("/")
        ) {

            image =
                "http://127.0.0.1:8000" +
                image;
        }
    }

    container.innerHTML = `
        <div
            class="
                flex
                gap-6
                items-center
            "
        >

            <img
                src="${image}"
                class="
                    w-40
                    h-32
                    rounded-xl
                    object-cover
                "
            >

            <div>

                <h2
                    class="
                        text-2xl
                        font-bold
                    "
                >
                    ${roomData.name}
                </h2>

                <p>
                    Capacity:
                    ${roomData.capacity}
                </p>

                <p
                    class="
                        text-rose-500
                        text-xl
                        font-semibold
                    "
                >
                    ${formatPrice(
                        roomData.price
                    )}
                </p>

            </div>

        </div>
    `;
}

document
    .getElementById(
        "bookingForm"
    )
    .addEventListener(
        "submit",
        createBooking
    );

async function createBooking(
    e
) {

    e.preventDefault();

    try {

        const booking =
            await apiRequest(
                "/customer/bookings/",
                "POST",
                {
                    homestay:
                        roomData.homestay,

                    check_in:
                        document
                            .getElementById(
                                "checkIn"
                            ).value,

                    check_out:
                        document
                            .getElementById(
                                "checkOut"
                            ).value,

                    total_guests:
                        Number(
                            document
                                .getElementById(
                                    "guests"
                                ).value
                        ),

                    rooms: [
                        {
                            room:
                                roomData.id
                        }
                    ]
                }
            );
        console.log("BOOKING RESPONSE:", booking);
        
        const payment =
            await apiRequest(
                `/payments/vnpay/create/${booking.id}/`,
                "POST"
            );


        window.location.href =
            payment.payment_url;

    } catch (error) {

    console.error(error);

    showToast(error.message);
    }
}