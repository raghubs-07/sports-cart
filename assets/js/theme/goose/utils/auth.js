/* eslint-disable indent */
// import Swal from 'sweetalert2';

/**
 * Function to log user to frontend using grapqhl
 * @param {*} context
 */
async function gLogin(user, pass, context) {
    const response = await fetch("/graphql", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${context.storefront_api}`,
        },
        body: JSON.stringify({
            query: `mutation Login($email: String!, $pass: String!) {
        login(email: $email, password: $pass) {
          result
        }
      }`,
            variables: {
                email: user,
                pass,
            },
        }),
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));

    return response;
}

/**
 *
 * @param {*} context
 * @returns
 */
async function gLogout(context) {
    const response = await fetch("/graphql", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${context.storefront_api}`,
        },
        body: JSON.stringify({
            query: `mutation Logout {
        logout {
          result
        }
      }`,
        }),
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error(error));

    return response;
}

export default { gLogin, gLogout };
