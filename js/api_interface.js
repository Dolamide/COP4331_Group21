/**
 * Gets account details by user id
 * 
 * @param {int} user_id The id of the user
 */
const getAccount = async (user_id) => {
    return getRequest("/LAMP/getAccount.php", { user_id });
}

/**
 * Gets account details by credentials
 * 
 * @param {string} username The username
 * @param {string} password The password
 */
const loginAccount = async (username, password) => {
    return postRequest("/LAMP/loginAccount.php", { username, password });
}

/**
 * Creates a new account
 * 
 * @param {string} username The account's username 
 * @param {string} password The account's password
 * @param {string} first_name The account's first name
 * @param {string} last_name The account's last name
 */
const addAccount = async (username, password, first_name, last_name) => {
    return postRequest("/LAMP/addAccount.php", { username, password, first_name, last_name });
}

/**
 * Creates a contact for a user
 * 
 * @param {*} user_id The id of the user creating the contact
 * @param {*} first_name The contact's first name
 * @param {*} last_name The contact's last name
 * @param {*} email The contact's email
 * @param {*} phone_number The contact's phone number
 */
const addContact = async (user_id, first_name, last_name, email, phone_number ) => {
    return postRequest("/LAMP/addContact.php", { user_id, first_name, last_name, email, phone_number });
}

/**
 * Deletes a contact from a user
 * 
 * @param {int} user_id The id of the user deleting the contact
 * @param {int} contact_id The id of the contact
 */
const deleteContact = async (user_id, contact_id) => {
    return deleteRequest("/LAMP/deleteContact.php", { user_id, contact_id });
}

/**
 * Gets all of a user's contacts
 * 
 * @param {int} user_id The id of the user
 */
const getContacts = async (user_id) => {
    return getRequest("/LAMP/getContacts.php", { user_id });
}

/**
 * Searches a user's contacts based on a query string
 * 
 * @param {int} user_id The id of the user performing the search
 * @param {string} search_data The query string
 */
const searchContact = async (user_id, search_data) => {
    return getRequest("/LAMP/searchContact.php", { user_id, search_data });
}

/**
 * Updates one of a user's contacts
 * 
 * @param {int} user_id The id of the user updating a contact
 * @param {int} contact_id The id of the contact to be updated
 * @param {string | null} first_name The new first name of the contact, or null to leave unchanged
 * @param {string | null} last_name The new last name of the contact, or null to leave unchanged
 * @param {string | null} email The new email of the contact, or null to leave unchanged
 * @param {string | null} phone_number The new phone number of the contact, or null to leave it unchanged
 */
const updateContact = async (user_id, contact_id, first_name, last_name, email, phone_number) => {
    return putRequest("/LAMP/updateContact.php", { user_id, contact_id, first_name, last_name, email, phone_number})
}

/**
 * Sends a POST request to an endpoint
 * 
 * @param {string} endpoint The relative path to the LAMP endpoint
 * @param {object} body The parameters that will be sent in the body
 */
const postRequest = async (endpoint, body) => {
    const data = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    return await data.json();
}

/**
 * Sends a PUT request to an endpoint
 * 
 * @param {string} endpoint The relative path to the LAMP endpoint
 * @param {object} body The parameters that will be sent in the body
 */
const putRequest = async (endpoint, body) => {
    const data = await fetch(endpoint, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    return await data.json();
}

/**
 * Sends a GET request to an endpoint
 * 
 * @param {string} endpoint The relative path to the LAMP endpoint
 * @param {object} params The parameters that will be sent in the url
 */
const getRequest = async (endpoint, params) => {
    const data = await fetch(generateRequestURL(endpoint, params), { method: "GET" });
    return await data.json();
}

/**
 * Sends a DELETE request to an endpoint
 * 
 * @param {string} endpoint The relative path to the LAMP endpoint
 * @param {object} params The parameters that will be sent in the url
 */
const deleteRequest = async (endpoint, params) => {
    const data = await fetch(generateRequestURL(endpoint, params), { method: "DELETE" });
    return await data.json();
}

/**
 * Generates a url with search parameters
 * 
 * @param {string} endpoint The relative path to the LAMP endpoint
 * @param {object} params The parameters that will be added to the end of the url
 */
const generateRequestURL = (endpoint, params) => {
    let url = new URL(endpoint, window.location.origin);
    let urlParams = new URLSearchParams();
    for (key in params) {
        urlParams.append(key, params[key]);
    }
    url.search = urlParams.toString();
    return url;
}