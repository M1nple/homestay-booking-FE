if (!isAuthenticated()) {

    window.location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML = renderNavbar();

loadProfile();

async function loadProfile() {

    try {

        const user =
            await apiRequest(
                "/auth/me/"
            );

        renderProfile(user);

    } catch (error) {

        console.error(error);

    }
}

function renderProfile(user) {

    const container =
        document.getElementById(
            "profileContainer"
        );

    let avatar =
        "https://ui-avatars.com/api/?name=User";

    if (
        user.avatar_url
    ) {

        avatar =
            user.avatar_url;
    }

    container.innerHTML = `

        <div
            class="
                flex
                flex-col
                items-center
                text-center
            "
        >

            <img
                src="${avatar}"
                class="
                    w-32
                    h-32
                    rounded-full
                    object-cover
                    border-4
                    border-rose-100
                "
            >

            <h1
                class="
                    text-3xl
                    font-bold
                    mt-6
                "
            >
                ${user.full_name || "User"}
            </h1>

            <span
                class="
                    mt-2
                    bg-rose-100
                    text-rose-600
                    px-4
                    py-1
                    rounded-full
                "
            >
                ${user.role}
            </span>

        </div>

        <div
            class="
                mt-10
                grid
                md:grid-cols-2
                gap-6
            "
        >

            <div
                class="
                    border
                    rounded-2xl
                    p-5
                "
            >

                <div
                    class="
                        text-gray-500
                        mb-1
                    "
                >
                    Email
                </div>

                <div
                    class="
                        font-semibold
                    "
                >
                    ${user.email}
                </div>

            </div>

            <div
                class="
                    border
                    rounded-2xl
                    p-5
                "
            >

                <div
                    class="
                        text-gray-500
                        mb-1
                    "
                >
                    Phone
                </div>

                <div
                    class="
                        font-semibold
                    "
                >
                    ${
                        user.phone ||
                        "Not provided"
                    }
                </div>

            </div>

            <div
                class="
                    border
                    rounded-2xl
                    p-5
                "
            >

                <div
                    class="
                        text-gray-500
                        mb-1
                    "
                >
                    User ID
                </div>

                <div
                    class="
                        font-semibold
                    "
                >
                    #${user.id}
                </div>

            </div>

            <div
                class="
                    border
                    rounded-2xl
                    p-5
                "
            >

                <div
                    class="
                        text-gray-500
                        mb-1
                    "
                >
                    Role
                </div>

                <div
                    class="
                        font-semibold
                    "
                >
                    ${user.role}
                </div>

            </div>

        </div>

    `;
}