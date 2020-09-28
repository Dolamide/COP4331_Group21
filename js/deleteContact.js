$('#delete-modal').on('show.bs.modal', (event) => {
    // Grab the button who originated this modal opening
    const originButton = $(event.relatedTarget);
    const contactId = parseInt(originButton.data('contact-id'));
    const contactName = originButton.data('contact-name');
    document.getElementById('delete-message').innerText = `Are you sure you want to delete "${contactName}"?`;

    // Setup the delete button to target this contact
    document.getElementById('delete-button').dataset.contactId = contactId;
});

document.getElementById('delete-button').addEventListener('click', async (event) => {
    const contactId = parseInt(event.target.dataset.contactId);
    
    // Delete this contact
    await deleteContact(getActiveUser().user_id, contactId);

    // Update the contacts table
    listContactsFunct();

    document.getElementById('delete-modal').style.display = 'none';
});

document.getElementById('no-modal-button').addEventListener('click', (event) => {
    document.getElementById('delete-modal').style.display = 'none';
})

const openDeleteModal = (target) => {
    const contactId = parseInt(target.dataset.contactId);
    const contactName = target.dataset.contactName;
    document.getElementById('delete-message').innerText = `Are you sure you want to delete "${contactName}"?`;

    // Setup the delete button to target this contact
    document.getElementById('delete-button').dataset.contactId = contactId;

    // Open the modal
    document.getElementById('delete-modal').style.display = 'block';
}
