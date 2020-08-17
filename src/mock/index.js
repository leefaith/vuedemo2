import Mock from "mockjs";
import axios from "axios";

const baseUrl = "http://localhost:8080";
const clientID = "2562e9b67566a65610f2";
const authorize_uri = "https://github.com/login/oauth/authorize";
const clientSecret = "a9893be29383d198eeff22bf20c68fd1e64c4b78";
//获取验证码
Mock.mock(`${baseUrl}/login/code_request`, "get", data => {
  let info = JSON.parse(data.body);
  if (info)
    return {
      code_state: true
    };
});

//验证码检验
Mock.mock(`${baseUrl}/login/code_check`, "get", data => {
  let info = JSON.parse(data.body);
  console.log(info);
  let code;
  const access_token =
    "35_L6brmEv-xn5QEicDd5NnfJ50fgVRBO4EAwFi2JzgzlQUgIlgcpS88cuVDlNT6vSlyWwSei-XXH2XDnMwYBrHJ651eBCFf2Yv75ANRNjcB1ZPDCc88mvL-8j_KGSd1JuKJwBnqbrfsxfw9YZXYHPdAJACLT";
  if (info.loginForm.mobile == "123456" && info.loginForm.code == "123456") {
    return access_token;
  } else {
    return (code = 404);
  }
});

//git登陆请求
Mock.mock(`${baseUrl}/login/git_request`, "get", data => {
  let info = JSON.parse(data.body);
  console.log(info);
  const redirect_uri = info.redirect_uri;
  const href = `${authorize_uri}?client_id=${clientID}&redirect_uri=${redirect_uri}`;
  console.log(href);
  return {
    href
  };
});

//git请求授权
Mock.mock(`${baseUrl}/login/git_oauth`, "get", data => {
  let info = JSON.parse(data.body);
  const requestToken = info.code;
  console.log(requestToken);

  //拼接URL
  const URL = `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`;

  //第一种方法可以得到token  但是是下载文件模式。没法传给前端
  //得到 如access_token=e7dce17146e898d13de9de3dfce0acdcbfd6cffc&scope=&token_type=bearer下载文件
   window.location.href = URL

  //第二种获取token  ，  这种方式总是出现跨域问题
  // const tokenResponse = axios({
  //   method: "POST",
  //   url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
  //   headers: {
  //     headers: {
  //       accept: "application/json"
  //     }
  //   }
  // });
  //  console.log(tokenResponse);


  return {};
});
