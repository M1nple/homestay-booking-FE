document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

const params =
    new URLSearchParams(
        window.location.search
    );

const status =
    params.get("status");

const bookingId =
    params.get("booking");

renderResult();

function renderResult() {

    const container =
        document.getElementById(
            "resultContainer"
        );

    const isSuccess =
        status === "success";

    container.innerHTML = `

        <div
            class="
                bg-white
                rounded-3xl
                shadow
                p-10
                text-center
            "
        >

            <div
                class="
                    text-7xl
                    mb-6
                "
            >
                ${
                    isSuccess
                    ? "✅"
                    : "❌"
                }
            </div>

            <h1
                class="
                    text-4xl
                    font-bold
                    mb-4
                "
            >
                ${
                    isSuccess
                    ? "Payment Successful"
                    : "Payment Failed"
                }
            </h1>

            <p
                class="
                    text-gray-500
                    mb-8
                "
            >
                ${
                    isSuccess
                    ? "Your payment has been completed successfully."
                    : "Your payment could not be completed."
                }
            </p>

            ${
                bookingId
                ? `
                    <div
                        class="
                            bg-gray-50
                            rounded-xl
                            p-4
                            mb-8
                        "
                    >
                        Booking #${bookingId}
                    </div>
                `
                : ""
            }

            <div
                class="
                    flex
                    justify-center
                    gap-4
                "
            >

                <a
                    href="my-bookings.html"
                    class="
                        bg-rose-500
                        text-white
                        px-6
                        py-3
                        rounded-xl
                    "
                >
                    My Bookings
                </a>

                <a
                    href="my-payments.html"
                    class="
                        border
                        px-6
                        py-3
                        rounded-xl
                    "
                >
                    My Payments
                </a>

            </div>

        </div>

    `;
}