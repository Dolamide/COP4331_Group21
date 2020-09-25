document.getElementById('submit').addEventListener("click", (event) => {
  event.preventDefault();

  (async () => {
    const user_id = getActiveUser().user_id;

    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const phone_number = document.getElementById('phone_number').value;

    await addContact(user_id, first_name, last_name, email, phone_number);

    document.location.href = '/home.html';
  })();
});