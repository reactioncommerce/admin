import getAccountsHandler from "./lib/accountsServer";
import hashPassword from "./lib/hashPassword";

export default {
  // called when the user attempts to log in
  login: async (params) => {
    const { username, password } = params;
    const { passwordClient } = getAccountsHandler();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return passwordClient.login({
      user: {
        email: username
      },
      password: hashPassword(password)
    });
  },
  // called when the user clicks on the logout button
  logout: () => {
    const { accountsClient } = getAccountsHandler();
    return accountsClient.logout();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("accounts:accessToken");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    console.log("I was called");
    return localStorage.getItem("accounts:accessToken") ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve()
};
