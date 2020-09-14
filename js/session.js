const USER_KEY = 'user';

/**
 * Stores user information into the browser's local storage for this session (login)
 * 
 * @param {object} user The user to store 
 */
const setActiveUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Retrieves the user for the current session
 * 
 * @returns {object|null} The user for the current session, or null if that user does not exist
 */
const getActiveUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
}

/**
 * Clears the user data for the session (logout).
 */
const clearActiveUser = () => {
    localStorage.removeItem(USER_KEY);
}