document
    .getElementById("registerForm")
    .addEventListener("submit", register);

async function register(e) {
    e.preventDefault();

    const payload = {
        full_name: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value
    };

    try {
        console.log("REGISTER PAYLOAD:", payload);

        const res = await apiRequest(
            "/auth/register/",
            "POST",
            payload
        );

        console.log("REGISTER RESPONSE:", res);

        alert("Register success! Please verify email OTP.");

        // 👉 lưu email để qua bước verify
        localStorage.setItem("verify_email", payload.email);

        window.location.href = "verify-email.html";

    } catch (error) {
        console.error(error);
        showToast?.(error.message || "Register failed");
    }
}