import axios from "axios";
import { error, success } from "./message";
import test from "./test";

const info={
  domainName:'ctrip.x3322.net',
  port:'3000',
}

async function signInClicked(username: string, password: string) {
  try {
    // login
    // success('登录成功')
    // error('登录失败')
    return "success";
  } catch (err: any) {
    console.log("signin: ", err);
    error("Signin Error: " + err);
  }
}

async function logoutClicked() {
  // localStorage.removeItem('userInfo');
  // await Session.signOut();
  // window.location.href = '/';
}

async function getUserInfo() {
  
}

export { logoutClicked, signInClicked, getUserInfo };
