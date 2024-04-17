import axios from "axios";

async function signInClicked(username: string, password: string) {
  return await axios.post(
    `https://47.120.68.102/api/nofresh/moderationPlatform/login`,
    {
      username: username,
      password: password,
    }
  );
}

async function logoutClicked() {
  if (process.env.NEXT_PUBLIC_TEST !== "test") {
    localStorage.removeItem("xcuserInfo");
    localStorage.removeItem("xcAuthorization");
  }
  window.location.href = "/";
}

export { logoutClicked, signInClicked };