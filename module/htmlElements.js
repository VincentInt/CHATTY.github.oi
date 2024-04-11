export const formInputMessegesHTML = `
<div id="container_load_file" class="container_load_file"></div>
<div class="container_inputs_messege">
<input
id="input_file_messege"
placeholder="Отправить сообщение..."
class="input_messege"
type="text"
/>
<input accept="image/*" id="input_file" class="input_file" type="file" />
<label for="input_file" class="btn_send">
<img
  class="icon"
  src="/img/icon/clip_3917548.png"
  alt="icon_clip_file"
/>
</label>
<button id="btn_send" class="btn_send">
<img
  class="icon"
  src="/img/icon/paper-plane-top_9821644.png"
  alt="icon_send"
/>
</button>
</div>`;
export const cardSendImgFileHTML = (
  result,
  fileName, id
) => `<div class="container_img_file">
<div class="load_img_file">
  <img src="${result}" alt="img_file" />
</div>
  <h3 class="img_file_name">${fileName}</h3>
<button id="btn_delete_${id}" class="trash_btn">
  <img class="trash_img" src="./img/icon/trash-xmark_10741733.png" alt="img_file_delete" />
</button>
</div>`;
export const cardChatUsersHTML = (avatar, userName, phone) =>
  `<div class="container_card_info_user chat_user">
    <div class="container_img_avatar_user">
      <img
        class="img_avatar_user"
        src="${avatar}"
        alt="img_avatar"
      />
    </div>
    <div class="container_user_text">
      <h2>${userName}</h2>
      <h3 class="text_description_under_name">${phone}</h3>
    </div>
  </div>`;
export const cardListUsersHTML = (
  avatar,
  userName,
  phone,
) => `<div class="container_img_avatar_user">
<img
  class="img_avatar_user"
  src="${avatar}"
  alt="img_avatar"
/>
</div>
<div class="container_user_text">
<h2>${userName}</h2>
<h3 class="text_description_under_name">
  ${phone}
</h3>
</div>`;
export const loadHTML = `
<div class="load_container">
  <div>
    <div class="load"></div>
    <h3 class="text_load">Загрузка</h3>
  </div>
</div>`;