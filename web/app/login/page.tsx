"use client";

import { signInClicked } from "@/app/utils/login";
import { Button, Card, CardBody, Input, Link } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EyeFilledIcon } from "./components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./components/EyeSlashFilledIcon";
import { useRouter } from "next/navigation";
import { error, success } from "../utils/message";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  const login = useCallback(async () => {
    if (!username || !password) {
      console.log("Username or password is empty.");
      return;
    }
    try {
      setIsLoading(true);
      signInClicked(username, password)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status === 200) {
              success("登陆成功");
              localStorage.setItem(
                "xcuserInfo",
                JSON.stringify({
                  userName: username,
                  permission: res.data.permission,
                  userId: res.data.reviewerId,
                })
              );
              localStorage.setItem("xcAuthorization", res.data.token);
              router.push("/main");
            } else {
              error("登录失败！");
              if (res.data.status === 401) {
                console.log(res.data?.msg);
              }
            }
          }
        })
        .catch((err: any) => {
          console.log("signin: ", err);
          error("Signin Error: " + err);
        });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [username, password]);

  return (
    <div className="flex w-full flex-col">
      <Card className="w-full self-center rounded-lg bg-opacity-50 p-8 sm:max-w-md lg:w-2/5">
        <CardBody className="gap-5 overflow-hidden">
          <div key="login" title="Login">
            <div className="mb-8 text-center font-bold text-[#5c5c5c]">
              欢迎登录旅行物语审核网站
            </div>
            <form className="flex flex-col gap-4">
              <Input
                isRequired
                label="Username"
                placeholder="Enter your username"
                type="text"
                onValueChange={setUsername}
              />
              <Input
                isRequired
                label="Password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                onValueChange={setPassword}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                      <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                    )}
                  </button>
                }
              />
              <div className="mt-3 flex justify-end gap-2">
                <Button
                  fullWidth
                  color="primary"
                  onClick={login}
                  isLoading={isLoading}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;