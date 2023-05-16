import Swal from "sweetalert2";
import gUtils from "../goose/utils";

const {
    auth: { gLogin },
} = gUtils;

export default function (context) {
    /**
     * Handle user logging in
     * @param {*} e
     * @returns
     */
    function handleLogin(e) {
        e.preventDefault();

        return Swal.fire({
            title: "Login",
            buttonsStyling: false,
            customClass: {
                confirmButton: "g-button g-button--fullbleed g-button--lg g-button--primary",
                container: "login-popup",
                title: "login-popup__title",
            },
            closeButtonHtml: '<svg><use xlink:href="#icon-close" /></svg>',
            html: `<input type="text" id="login" class="form-input" placeholder="Email Address"><input type="password" id="password" class="form-input" placeholder="Password">`,
            confirmButtonText: "Login",
            footer: 'New to the Market Sports?<br /><div class="login-popup__bottom-links"><a href="/login.php?action=create_account">Create an account</a> <a href="/login.php?action=reset_password">Forgot password?</a><div>',
            showCloseButton: true,
            focusConfirm: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const login = Swal.getPopup().querySelector("#login").value;
                const password = Swal.getPopup().querySelector("#password").value;

                if (!login || !password) {
                    Swal.showValidationMessage("Please enter username and password");
                    return;
                }

                return gLogin(login, password, context)
                    .then((res) => {
                        if (!res?.data?.login?.result || res?.data?.login?.result !== "success") {
                            console.log(res)
                            throw new Error(res?.errors[0]?.message);
                        }
                        return res?.data?.login?.result;
                    })
                    .catch((e) => {
                        Swal.showValidationMessage(`${e}`);
                    });
            },
        }).then((res) => {
            if (res.value) {
                Swal.fire({
                    icon: "success",
                    text: "Logged in successfully",
                });
            }
            return res;
        });
    }

    function handleLogout() {}

    function handleClick(e) {
        if (e.target.closest(".js-login")) {
            handleLogin(e);
        }
    }

    document.addEventListener("openLogin", (e) => handleLogin(e));

    document.addEventListener("click", (e) => handleClick(e));
}
