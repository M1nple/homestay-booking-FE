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

                        <a href="my-bookings.html">
                            My Bookings
                        </a>

                        ${
                            isAuthenticated()
                            ? `
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
                            `
                            : `
                                <a
                                    href="login.html"
                                >
                                    Login
                                </a>
                            `
                        }

                    </div>

                </div>

            </div>

        </nav>
    `;
}