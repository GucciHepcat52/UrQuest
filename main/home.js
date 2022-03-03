






const logout = () => {
    window.localStorage.clear();
    window.location.href = "./login.html";
}

const logoutBtn = document.getElementById('logout').addEventListener('click', logout);
