function renderNavbar() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const role =
        user?.role;

    return `

    <nav
        class="
            bg-white
            shadow-sm
        "
    >

        <div
            class="
                max-w-7xl
                mx-auto
                px-6
            "
        >

            <div
                class="
                    flex
                    justify-between
                    items-center
                    h-16
                "
            >

                <a
                    href="index.html"
                    class="
                        text-2xl
                        font-bold
                        text-rose-500
                    "
                >
                    Homestay
                </a>

                <div
                    class="
                        flex
                        items-center
                        gap-6
                    "
                >

                    <a href="index.html">
                        Home
                    </a>

                    ${

                        !isAuthenticated()

                        ?

                        `

                        <a href="login.html">
                            Login
                        </a>

                        <a href="register.html">
                            Register
                        </a>

                        `

                        :

                        `

                        <details
                            class="relative"
                        >

                            <summary
                                class="
                                    cursor-pointer
                                    list-none
                                "
                            >
                                Account
                            </summary>

                            <div
                                class="
                                    absolute
                                    right-0
                                    mt-2
                                    bg-white
                                    shadow-lg
                                    rounded-xl
                                    min-w-[220px]
                                    p-3
                                    flex
                                    flex-col
                                    gap-2
                                    z-50
                                "
                            >

                                <a
                                    href="profile.html"
                                >
                                    Profile
                                </a>

                                <a
                                    href="my-bookings.html"
                                >
                                    My Bookings
                                </a>

                                <a
                                    href="my-payments.html"
                                >
                                    My Payments
                                </a>


                                ${

                                    role ===
                                    "CUSTOMER"

                                    ?

                                    `

                                    <a href="my-reviews.html">
                                        My Reviews
                                    </a>

                                    <a
                                        href="become-host.html"
                                    >
                                        Become Host
                                    </a>

                                    <a
                                        href="my-host-requests.html"
                                    >
                                        My Host Requests
                                    </a>


                                    `

                                    :

                                    ""

                                }

                                <button
                                    onclick="logout()"
                                    class="
                                        text-left
                                        text-red-500
                                    "
                                >
                                    Logout
                                </button>

                            </div>

                        </details>

                        ${

                            role ===
                            "HOST"

                            ?

                            `

                            <details
                                class="relative"
                            >

                                <summary
                                    class="
                                        cursor-pointer
                                        list-none
                                    "
                                >
                                    Host
                                </summary>

                                <div
                                    class="
                                        absolute
                                        right-0
                                        mt-2
                                        bg-white
                                        shadow-lg
                                        rounded-xl
                                        min-w-[220px]
                                        p-3
                                        flex
                                        flex-col
                                        gap-2
                                        z-50
                                    "
                                >

                                    <a
                                        href="host-dashboard.html"
                                    >
                                        Dashboard
                                    </a>

                                    <a
                                        href="host-homestays.html"
                                    >
                                        My Homestays
                                    </a>

                                    <a
                                        href="host-bookings.html"
                                    >
                                        Bookings
                                    </a>

                                    <a
                                        href="host-payments.html"
                                    >
                                        Revenue
                                    </a>

                                </div>

                            </details>

                            `

                            :

                            ""

                        }

                        ${

                            role ===
                            "ADMIN"

                            ?

                            `

                            <details
                                class="relative"
                            >

                                <summary
                                    class="
                                        cursor-pointer
                                        list-none
                                    "
                                >
                                    Admin
                                </summary>

                                <div
                                    class="
                                        absolute
                                        right-0
                                        mt-2
                                        bg-white
                                        shadow-lg
                                        rounded-xl
                                        min-w-[220px]
                                        p-3
                                        flex
                                        flex-col
                                        gap-2
                                        z-50
                                    "
                                >

                                    <a
                                        href="admin-dashboard.html"
                                    >
                                        Dashboard
                                    </a>

                                    <a
                                        href="admin-users.html"
                                    >
                                        Users
                                    </a>

                                    <a
                                        href="admin-host-requests.html"
                                    >
                                        Host Requests
                                    </a>

                                    <a
                                        href="admin-homestays.html"
                                    >
                                        Homestays
                                    </a>

                                    <a
                                        href="admin-bookings.html"
                                    >
                                        Bookings
                                    </a>

                                    <a
                                        href="admin-payments.html"
                                    >
                                        Payments
                                    </a>

                                    <a
                                        href="admin-amenities.html"
                                    >
                                        Amenities
                                    </a>

                                </div>

                            </details>

                            `

                            :

                            ""

                        }

                        `

                    }

                </div>

            </div>

        </div>

    </nav>

    `;
}