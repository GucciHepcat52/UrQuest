const infoBox = document.getElementById("character-info");
const createBtn = document.getElementById("create-character");
const logoutBtn = document.getElementById("logout");
const charList = document.getElementById("character-list");
const account_id = window.localStorage.getItem("UrQuest-user");

const getAllUserCharacters = async () => {
  await axios
    .get(`http://localhost:4004/api/characters?account_id=${account_id}`)
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        const toonBtn = document.createElement("button");
        toonBtn.id = "show-character";

        toonBtn.textContent = res.data[i].character_name;
        charList.appendChild(toonBtn);
      }
    })
    .catch((error) => console.log(error));
};

window.onload = getAllUserCharacters;

const addNewCharacterBtn = (e) => {
  e.preventDefault();
  infoBox.innerHTML = `<form id="create-character-form">
  <label for="character-creation-input">Enter Character Name</label>
  <input type="text" name="character-creation-input" id="character-creation-input" required>
  <input type="submit" name="character-creation-submit" id="character-creation-submit">
</form>`;

  document
    .getElementById("create-character-form")
    .addEventListener("submit", submitNewCharacter);
};

createBtn.addEventListener("click", addNewCharacterBtn);

const submitNewCharacter = async (e) => {
  e.preventDefault();

  const toonBtn = document.createElement("button");
  toonBtn.id = "show-character";

  let charName = document.getElementById("character-creation-input");

  let bodyObj = {
    accountId: account_id,
    characterName: charName.value,
  };

  try {
    await axios
      .post(`http://localhost:4004/api/characters`, bodyObj)
      .then((res) => {
        toonBtn.textContent = res.data.character_name;
        charList.appendChild(toonBtn);
        console.log("Character was created!");
      });
  } catch (error) {
    return console.log(error);
  }

  document.getElementById("create-character-form").remove();
};

const logout = () => {
  window.localStorage.clear();
  window.location.href = "./login.html";
};

logoutBtn.addEventListener("click", logout);
