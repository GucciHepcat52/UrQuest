const infoBox = document.getElementById("character-info");
const createBtn = document.getElementById("create-character");
const logoutBtn = document.getElementById("logout");
const charList = document.getElementById("character-list");
const account_id = window.localStorage.getItem("UrQuest-user");

const characters = {};

const getAllUserCharacters = async () => {
  await axios
    .get(`http://localhost:4004/api/characters?account_id=${account_id}`)
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        const toonBtn = document.createElement("button");
        toonBtn.id = "show-character";

        toonBtn.textContent = res.data[i].character_name;
        toonBtn.addEventListener("click", showCharacterInfo);
        charList.appendChild(toonBtn);

        characters[res.data[i].character_name] = res.data[i];
      }
    })
    .catch((error) => console.log(error));
  console.log(characters);
};

window.onload = getAllUserCharacters;

const addNewCharacterBtn = (e) => {
  e.preventDefault();
  infoBox.innerHTML = `<form id="create-character-form">
  <label for="character-creation-input">Enter Character Name</label>
  <input type="text" name="character-creation-input" id="character-creation-input" required>
  <input type="text" name="character-creation-info" id="character-creation-info">
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
  let charInfo = document.getElementById("character-creation-info");

  let bodyObj = {
    accountId: account_id,
    characterName: charName.value,
    characterInfo: charInfo.value,
  };

  try {
    await axios
      .post(`http://localhost:4004/api/characters`, bodyObj)
      .then((res) => {
        location.reload();
      });
  } catch (error) {
    return console.log(error);
  }

  document.getElementById("create-character-form").remove();
};

const showCharacterInfo = (event) => {
  // event.preventDefault();
  let createForm = document.getElementById("create-character-form");
  let characterDisplay = document.getElementById("character-card");

  if (createForm) {
    createForm.remove();
  }

  if (characterDisplay) {
    characterDisplay.remove();
  }

  const charCard = document.createElement("section");
  charCard.id = "character-card";

  charCard.innerHTML = `<h1 id="name">${event.target.textContent}</h1>
  <li>${characters[event.target.textContent].information}</li>
  <button id="character-delete" value="${characters[event.target.textContent].character_id}">Delete</button>`;

  infoBox.appendChild(charCard);
  const deleteCharBtn = document.getElementById("character-delete");
  deleteCharBtn.addEventListener("click", deleteCharacter);
};

const deleteCharacter = async (e) => {
  e.preventDefault();

  let neededId = e.target.value;
  console.log(neededId);

  await axios
    .delete(`http://localhost:4004/api/characters/${neededId}`)
    .then((res) => {
      location.reload();
    })
    .catch((err) => console.log(err));
};

const logout = () => {
  window.localStorage.clear();
  window.location.href = "./login.html";
};

logoutBtn.addEventListener("click", logout);
