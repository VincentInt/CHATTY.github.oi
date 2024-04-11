export const sendAPI = async () => {
  const USERS_URL = "https://jsonplaceholder.typicode.com/users";
  const USERS_AVATARS_URL = "https://jsonplaceholder.typicode.com/photos";

  const usersArrayBase = [];

  const users_base = await fetch(USERS_URL)
    .then((res) => res.json())
    .catch((err) => new Error(err));

  const users_avatars_base = await fetch(USERS_AVATARS_URL)
    .then((res) => res.json())
    .then((avatars) => avatars.slice(0, 10))
    .catch((err) => new Error(err));

  await users_base.forEach((elem, index) => {
    usersArrayBase.push({
      id: elem.id,
      statusApi: true,
      username: elem.name,
      avatar: users_avatars_base[index].url,
      messeges: [],
      phone: elem.phone,
    });
  });

  return usersArrayBase;
};
export const usersMessegesFunc = async (index) => {
  const USERS_MESSEGES_URL = "https://jsonplaceholder.typicode.com/comments";

  const messegeItem = await fetch(`${USERS_MESSEGES_URL}?postId=${index}`)
    .then((res) => res.json())
    .catch((err) => new Error(err));
  return messegeItem;
};
