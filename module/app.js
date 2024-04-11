import { sendAPI, usersMessegesFunc } from "./api.js";
import {
  formInputMessegesHTML,
  cardSendImgFileHTML,
  cardChatUsersHTML,
  cardListUsersHTML,
  loadHTML,
} from "./htmlElements.js";

const usersContactList = document.getElementById("nav_contact_user");
const usersChats = document.getElementById("user_chat");
const messegesChats = document.getElementById("messeges_chat");
const formMessege = document.getElementById("form_messege");
const formSearchContact = document.getElementById("search_contact");
const dropUsersList = document.getElementById("drop_users_list");

let statusDropList = false;
dropUsersList.onclick = () => changeDropUsersList();
window.onresize = () => changeDropUsersList("onsize");

const userBase = [];
const imgFileBase = [];

function changeDropUsersList(dropState) {
  if (window.screen.width >= 560) usersContactList.style = "  height: 65.5%;";
  else (usersContactList.style = "height: 0;")
   if(dropState !== 'onsize'){
    !statusDropList
      ? ((usersContactList.style = "height: 100%;"), (statusDropList = true), dropUsersList.style = 'rotate:180deg')
      : ((usersContactList.style = "height: 0;"), (statusDropList = false),dropUsersList.style = 'rotate: 0deg');
      
  }
}
async function getUsers() {
  userBase.push(...(await sendAPI()));
  renderUserList();
}
function loadElement(element) {
  element.innerHTML = loadHTML;
}
function renderSendFile() {
  const containerFile = document.getElementById("container_load_file");
  containerFile.innerHTML = "";

  imgFileBase.forEach((element, index) => {
    containerFile.insertAdjacentHTML(
      "afterbegin",
      cardSendImgFileHTML(element.src, element.fileName, index)
    );
    document.getElementById(`btn_delete_${index}`).onclick = () => {
      imgFileBase.splice(index, index + 1);
      renderSendFile();
    };
  });
}
function formInputFile() {
  formMessege.innerHTML = formInputMessegesHTML;

  const inputFile = document.getElementById("input_file");

  inputFile.oninput = () => {
    const reader = new FileReader();
    reader.readAsDataURL(inputFile.files[0]);
    reader.onload = () => {
      const fileName =
        inputFile.files[0].name.length < 10
          ? inputFile.files[0].name
          : inputFile.files[0].name.slice(0, 10) + "...";
      imgFileBase.push({ src: reader.result, fileName: fileName });
      renderSendFile();
    };
  };
}
async function getMessegesAnChats(elem) {
  loadElement(messegesChats);

  let messegeItem = await usersMessegesFunc(elem.id);
  userBase[elem.id - 1].messeges.push(
    ...messegeItem.map((item) => {
      return { my: 1, body: item.body };
    })
  );
  userBase[elem.id - 1].statusApi = false;
}
async function renderMessegeChat(elem) {
  const messegesHTMLItemArray = [];

  if (elem.statusApi) await getMessegesAnChats(elem);

  messegesChats.innerHTML = "";
  elem.messeges.forEach((item) => {
    if (item.my) {
      if (item.file !== undefined && item.file.length) {
        item.file.forEach((element) => {
          messegesHTMLItemArray.push(`<div class="interlocutor_messege">
            <img src="${element.src}" alt="img_messege_chat"  class="messege_chat img_messege_chat" />
            </div>`);
        });
        if (item.body.length) {
          messegesHTMLItemArray.push(`<div class="my_messege">
          <h3 class="messege_chat">
            ${item.body}
          </h3>
        </div>`);
        }
      } else {
        messegesHTMLItemArray.push(`<div class="interlocutor_messege">
          <h3 class="messege_chat">
            ${item.body}
          </h3>
        </div>`);
      }
    } else {
      if (item.file !== undefined && item.file.length) {
        item.file.forEach((element) => {
          messegesHTMLItemArray.push(`<div class="my_messege">
            <img src="${element.src}" alt="img_messege_chat"  class="messege_chat img_messege_chat" />
            </div>`);
        });
        if (item.body.length) {
          messegesHTMLItemArray.push(`<div class="my_messege">
          <h3 class="messege_chat">
            ${item.body}
          </h3>
        </div>`);
        }
      } else {
        messegesHTMLItemArray.push(`<div class="my_messege">
          <h3 class="messege_chat">
            ${item.body}
          </h3>
        </div>`);
      }
    }
  });
  imgFileBase.splice(0, imgFileBase.length);
  messegesChats.insertAdjacentHTML(
    "afterbegin",
    messegesHTMLItemArray.join("")
  );
  formInputFile();

  document.getElementById("btn_send").onclick = () => formSendMessege(elem);

  messegesChats.scrollTo(0, messegesChats.scrollHeight);
}
function renderUserChat(elem) {
  usersChats.innerHTML = cardChatUsersHTML(
    elem.avatar,
    elem.username,
    elem.phone
  );
  renderMessegeChat(elem);
}
function formSendMessege(elem) {
  const inputSend = document.getElementById("input_file_messege");
  if (inputSend.value !== "" || imgFileBase.length !== 0) {
    userBase[elem.id - 1].messeges.push({
      my: 0,
      body: inputSend.value,
      file: [...imgFileBase],
    });
    inputSend.value = "";

    renderMessegeChat(userBase[elem.id - 1]);
    renderSendFile();
  }
}
function renderUserList(search) {
  usersContactList.innerHTML = "";
  let renderUsersList = userBase;
  const filteredUserBase = userBase.filter(
    (item) =>
      item.username.toLowerCase().includes(search) ||
      item.phone.includes(search)
  );
  if (filteredUserBase.length > 0) renderUsersList = filteredUserBase;

  renderUsersList.forEach((elem, index) => {
    const container = document.createElement("div");
    container.classList.add("container_card_info_user");

    container.onclick = () => renderUserChat(renderUsersList[index]);

    container.innerHTML = cardListUsersHTML(
      elem.avatar,
      elem.username,
      elem.phone
    );
    usersContactList.insertAdjacentElement(`afterbegin`, container);
  });
  formSearchContact[0].oninput = () => {
    setTimeout(() => renderUserList(formSearchContact[0].value), 1000);
  };
}
getUsers();
