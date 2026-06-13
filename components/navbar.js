function renderNavbar() {

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
                            gap-6
                            items-center
                        "
                    >

                        <a href="index.html">
                            Home
                        </a>

                        ${
                            isAuthenticated() 
                            ? `
                                <a href="my-bookings.html">
                                    My Bookings
                                </a>

                                <a href="my-payments.html">
                                    My Payments
                                </a>
                                
                                <a href="profile.html">
                                    Profile
                                </a>

                                <button
                                    onclick="logout()"
                                    class="
                                        bg-rose-500
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                    "
                                >
                                    Logout
                                </button>
                                
                                <a href="host-dashboard.html">
                                    Host Dashboard
                                </a>

                                <a href="host-homestays.html">
                                    My Homestays
                                </a>

                            `
                            : `
                                <a href="login.html">
                                    Login
                                </a>

                                <a href="register.html">
                                    Register
                                </a>
                            `
                        }

 

                    </div>

                </div>

            </div>

        </nav>
    `;
}