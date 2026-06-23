document
    .getElementById(
        "loginForm"
    )
    .addEventListener(
        "submit",
        login
    );

async function login(
    e
) {

    e.preventDefault();

    try {

        const data =
            await apiRequest(
                "/auth/login/",
                "POST",
                {
                    email:
                        document.getElementById(
                            "email"
                        ).value,

                    password:
                        document.getElementById(
                            "password"
                        ).value
                }
            );

        saveTokens(data);

        const me =
            await apiRequest(
                "/auth/me/"
            );

        localStorage.setItem(
            STORAGE_KEYS.USER,
            JSON.stringify(
                me
            )
        );

        if (
            me.role ===
            "ADMIN"
        ) {

            location.href =
                "admin-dashboard.html";
        }

        else if (
            me.role ===
            "HOST"
        ) {

            location.href =
                "host-dashboard.html";
        }

        else {

            location.href =
                "index.html";
        }

    }

    catch (error) {

        alert(
            error.message
        );
    }
}