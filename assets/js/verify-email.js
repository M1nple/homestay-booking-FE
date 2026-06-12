document
    .getElementById("verifyForm")
    .addEventListener("submit", verifyEmail);

async function verifyEmail(e) {
    e.preventDefault();

    const email = localStorage.getItem("verify_email");
    const otp = document.getElementById("otp").value;

    try {
        const payload = {
            email: email,
            otp: otp
        };

        console.log("VERIFY PAYLOAD:", payload);

        const res = await apiRequest(
            "/auth/verify-email/",
            "POST",
            payload
        );

        console.log("VERIFY RESPONSE:", res);

        alert("Verify success! You can login now.");

        localStorage.removeItem("verify_email");

        window.location.href = "login.html";

    } catch (error) {
        console.error(error);
        showToast?.(error.message || "Verify failed");
    }
}