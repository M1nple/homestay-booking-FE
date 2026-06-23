if (!isAuthenticated()) {

    location.href =
        "login.html";
}

document.getElementById(
    "navbar"
).innerHTML =
    renderNavbar();

loadUsers();

async function loadUsers() {

    try {

        const users =
            await apiRequest(
                "/admin/users/"
            );

        renderUsers(
            users
        );

    }
    catch (error) {

        console.error(error);

        alert(
            error.message
        );
    }
}

function renderUsers(users) {

    const tbody =
        document.getElementById(
            "usersTable"
        );

    tbody.innerHTML =
        users
        .map(
            user => `
                <tr
                    class="
                        border-b
                        hover:bg-gray-50
                    "
                >

                    <td class="p-4">
                        ${user.id}
                    </td>

                    <td class="p-4">
                        ${user.full_name}
                    </td>

                    <td class="p-4">
                        ${user.email}
                    </td>

                    <td class="p-4">
                        ${user.phone || "-"}
                    </td>

                    <td class="p-4">
                        ${user.role}
                    </td>

                    <td class="p-4">
                        ${
                            user.is_verified
                                ? "✅"
                                : "❌"
                        }
                    </td>

                    <td class="p-4">
                        ${
                            user.is_active
                                ? "✅"
                                : "❌"
                        }
                    </td>

                    <td class="p-4">
                        ${new Date(
                            user.created_at
                        ).toLocaleDateString()}
                    </td>

                </tr>
            `
        )
        .join("");
}