if (!isAuthenticated()) {

    window.location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML = renderNavbar();

const paymentId =
    getQueryParam("id");

loadPayment();

async function loadPayment() {

    try {

        const payment =
            await apiRequest(
                `/customer/payments/${paymentId}/`
            );

        const container =
            document.getElementById(
                "paymentDetail"
            );

        container.innerHTML = `

            <div
                class="
                    bg-white
                    rounded-2xl
                    shadow
                    p-8
                "
            >

                <h1
                    class="
                        text-3xl
                        font-bold
                        mb-6
                    "
                >
                    Payment Detail
                </h1>

                <div
                    class="
                        space-y-2
                        mb-8
                    "
                >

                    <p>
                        <strong>ID:</strong>
                        ${payment.id}
                    </p>

                    <p>
                        <strong>Booking:</strong>
                        #${payment.booking_id}
                    </p>

                    <p>
                        <strong>Amount:</strong>
                        ${Number(
                            payment.amount
                        ).toLocaleString()}
                        VND
                    </p>

                    <p>
                        <strong>Method:</strong>
                        ${payment.method}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${payment.status}
                    </p>

                </div>

                <h2
                    class="
                        text-xl
                        font-bold
                        mb-4
                    "
                >
                    Transaction Attempts
                </h2>

                <div
                    class="
                        space-y-4
                    "
                >

                    ${
                        payment.attempts.map(
                            attempt => `

                            <div
                                class="
                                    border
                                    rounded-xl
                                    p-4
                                "
                            >

                                <p>
                                    <strong>
                                        Txn Ref:
                                    </strong>
                                    ${attempt.txn_ref}
                                </p>

                                <p>
                                    <strong>
                                        VNPay No:
                                    </strong>
                                    ${attempt.vnp_transaction_no}
                                </p>

                                <p>
                                    <strong>
                                        Response:
                                    </strong>
                                    ${attempt.vnp_response_code}
                                </p>

                                <p>
                                    <strong>
                                        Bank:
                                    </strong>
                                    ${attempt.bank_code}
                                </p>

                                <p>
                                    <strong>
                                        Status:
                                    </strong>
                                    ${attempt.status}
                                </p>

                            </div>

                        `
                        ).join("")
                    }

                </div>

            </div>

        `;

    } catch (error) {

        console.error(error);
    }
}