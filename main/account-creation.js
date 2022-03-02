const submitForm = document.querySelector("form");

const submitHandler = (event) => {
  event.preventDefault();

  let firstName = document.getElementById("fname");
  let lastName = document.getElementById("lname");
  let email = document.getElementById("email");
  let username = document.getElementById("username");
  let password = document.getElementById("password");

  let bodyObj = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    username: username.value,
    password: password.value,
  };

  axios
    .post("http://localhost:4004/api/users", bodyObj)
    .then((res) => {
      console.log(res);
      alert("Account was created successful!");
    })
    .catch((err) => console.log(err));

  firstName.value = "";
  lastName.value = "";
  email.value = "";
  username.value = "";
  password.value = "";
};

submitForm.addEventListener("submit", submitHandler);
