document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        handleLogin
    );

async function handleLogin(e) {

    e.preventDefault();

    const email =
        document.getElementById(
            "email"
        ).value;

    const password =
        document.getElementById(
            "password"
        ).value;

    const error =
        document.getElementById(
            "errorMessage"
        );

    try {

        const response =
            await apiRequest(
                "/auth/login/",
                "POST",
                {
                    email,
                    password
                }
            );

        saveTokens(response);

        window.location.href =
            "index.html";

    } catch (err) {

        error.textContent =
            "Email hoặc mật khẩu không đúng";
    }
}