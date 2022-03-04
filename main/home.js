const infoBox = document.getElementById("character-info");
const createBtn = document.getElementById("create-character");
const logoutBtn = document.getElementById("logout");

const addNewCharacter = (e) => {
  e.preventDefault();
  infoBox.innerHTML = `<form id="create-character-form">
  <label for="charcter-creation-input">Enter Character Name</label>
  <input type="text" name="charcter-creation-input" id="charcter-creation-input" required>
  <input type="submit" name="charcter-creation-submit" id="charcter-creation-submit">
</form>`;
};

createBtn.addEventListener("click", addNewCharacter);

const logout = () => {
  window.localStorage.clear();
  window.location.href = "./login.html";
};

logoutBtn.addEventListener("click", logout);
