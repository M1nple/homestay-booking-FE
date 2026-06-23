if (!isAuthenticated()) {
    location.href = "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

loadDashboard();

async function loadDashboard() {

    try {

        const data =
            await apiRequest(
                "/admin/dashboard/"
            );

        renderStats(data);

    } catch (error) {

        console.error(error);
    }
}

function renderStats(data) {

    const container =
        document.getElementById(
            "statsContainer"
        );

    container.innerHTML = `

        ${card(
            "Users",
            data.total_users
        )}

        ${card(
            "Hosts",
            data.total_hosts
        )}

        ${card(
            "Homestays",
            data.total_homestays
        )}

        ${card(
            "Rooms",
            data.total_rooms
        )}

        ${card(
            "Bookings",
            data.total_bookings
        )}

        ${card(
            "Revenue",
            formatPrice(
                data.total_revenue
            )
        )}

    `;
}

function card(
    title,
    value
) {

    return `
        <div
            class="
                bg-white
                rounded-3xl
                p-6
                shadow
            "
        >

            <p
                class="
                    text-gray-500
                    mb-2
                "
            >
                ${title}
            </p>

            <h2
                class="
                    text-3xl
                    font-bold
                "
            >
                ${value}
            </h2>

        </div>
    `;
}