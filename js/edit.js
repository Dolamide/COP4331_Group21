document.addEventListener("DOMContentLoaded", async () => { 
    const params = new URL(document.location).searchParams;
    const contact_id = Number(params.get('contact_id'));
    const user_id = getActiveUser().user_id;

    const contact = await getContact(user_id, contact_id);
    const { first_name, last_name, email, phone_number } = contact.data;

    document.getElementById('first_name').value = first_name;
    document.getElementById('last_name').value = last_name;
    document.getElementById('email').value = email;
    document.getElementById('phone_number').value = phone_number;
});

document.getElementById('submit').addEventListener("click", (event) => {
    event.preventDefault();


    (async () => {
        const params = new URL(document.location).searchParams;
        const contact_id = Number(params.get('contact_id'));
        const user_id = getActiveUser().user_id;

        const first_name = document.getElementById('first_name').value;
        const last_name = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;
        const phone_number = document.getElementById('phone_number').value;

        await updateContact(user_id, contact_id, first_name, last_name, email, phone_number);

        document.location.href = '/home.html';
    })();
}); 