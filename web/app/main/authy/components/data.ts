import { success, error } from "@/app/utils/message";
import instance from "@/app/utils/request";

const columns = [
  { name: "ID", iid: "reviewerId" },
  { name: "NAME", iid: "username" },
  { name: "ACTIONS", iid: "actions" },
];

let users: Array<{ reviewerId: number; username: string }> = [];

if (process.env.NEXT_PUBLIC_TEST === "test") {
  users = [
    {
      reviewerId: 0,
      username: "nich",
    },
    {
      reviewerId: 1,
      username: "nich",
    },
    {
      reviewerId: 2,
      username: "nich",
    },
    {
      reviewerId: 3,
      username: "nich",
    },
    {
      reviewerId: 4,
      username: "nich",
    },
    {
      reviewerId: 5,
      username: "nich",
    },
  ];
} else {
  try {
    instance
      .get(`${process.env.NEXT_PUBLIC_HOST}/getReviewerList`)
      .then((res) => {
        if (res.status === 200) {
          users = res.data.reviewerList;
          localStorage.setItem("Authorization", res.data.freshToken);
          success("获取审核人员列表成功");
        } else {
          error("获取审核人员列表失败！");
          if (res.status === 401) {
            console.log(res.data?.msg);
          }
        }
      })
      .catch((err: any) => {
        console.log("Get Reviewer List Error: ", err);
        error("Get Reviewer List Error: " + err);
      });
  } catch (err: any) {
    console.log("Get Reviewer List Error: ", err);
    error("Get Reviewer List Error: " + err);
  }
}

export { columns, users };
