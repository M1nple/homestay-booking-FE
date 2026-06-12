if (!isAuthenticated()) {

    window.location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML = renderNavbar();

loadPayments();

async function loadPayments() {

    try {

        const payments =
            await apiRequest(
                "/customer/payments/"
            );

        const container =
            document.getElementById(
                "paymentsContainer"
            );

        if (
            !payments ||
            payments.length === 0
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
                    No payments found
                </div>
            `;

            return;
        }

        container.innerHTML =
            payments.map(
                payment => `

                <a
                    href="
                        payment-detail.html?id=${payment.id}
                    "
                    class="
                        block
                        bg-white
                        rounded-2xl
                        shadow
                        p-6
                        hover:shadow-lg
                        transition
                    "
                >

                    <div
                        class="
                            flex
                            justify-between
                            items-start
                        "
                    >

                        <div>

                            <h3
                                class="
                                    text-xl
                                    font-bold
                                "
                            >
                                ${payment.homestay_name}
                            </h3>

                            <p
                                class="
                                    text-gray-500
                                "
                            >
                                Payment #${payment.id}
                            </p>

                            <p>
                                Booking:
                                #${payment.booking_id}
                            </p>

                        </div>

                        <span
                            class="
                                px-4
                                py-1
                                rounded-full
                                bg-yellow-100
                                text-yellow-700
                            "
                        >
                            ${payment.status}
                        </span>

                    </div>

                    <div class="mt-4">

                        <p>
                            Method:
                            ${payment.method}
                        </p>

                        <p>
                            Amount:
                            ${Number(
                                payment.amount
                            ).toLocaleString()}
                            VND
                        </p>

                    </div>

                </a>

            `
            ).join("");

    } catch (error) {

        console.error(error);
    }
}