function formatPrice(price) {
    return Number(price).toLocaleString(
        "vi-VN"
    ) + " đ";
}

function getQueryParam(name) {
    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get(name);
}

function showToast(message) {
    alert(message);
}

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 4000);
}