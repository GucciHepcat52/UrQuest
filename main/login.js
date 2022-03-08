const formBtn = document.querySelector("form");

const submitHandler = async (event) => {
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.password.value;
  let userId = 0;
  let loggedIn = false;

  try {
    await axios
      .get(
        `http://localhost:4004/api/users?username=${username}&password=${password}`
      )
      .then((res) => {
        let userTmp = res.data[0];
        userId = userTmp.user_id;
        loggedIn = true;
      });
  } catch (error) {
    alert("Invalid Username or Password");
    console.log(error);
  }
  
  if (loggedIn === true) {
    window.localStorage.setItem("UrQuest-user", userId);
    window.localStorage.setItem("UrQuest-username", username);
    window.location.href = "./home.html";
  }

  event.target.reset();
};

formBtn.addEventListener("submit", submitHandler);
