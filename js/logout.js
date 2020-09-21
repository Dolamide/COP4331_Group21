document.getElementById('logout').addEventListener("click", async (event) => {
    event.preventDefault();

    clearActiveUser();

    document.location.href = '/loginpage.html';
});