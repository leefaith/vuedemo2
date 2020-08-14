import Mock from "mockjs";
import axios from "axios";

const baseUrl = "0171f09d7192f2b44bf0";
const clientId = "0171f09d7192f2b44bf0";
const authorize_uri = "https://github.com/login/oauth/authorize";
const clientSecret = "443e278cf9c35894a8072a681d8f41b998c64fc8";
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
  const href = `${authorize_uri}?client_id=${clientId}&redirect_uri=${redirect_uri}`;
  console.log(href);
  return {
    href
  };
});

//git请求授权
Mock.mock(`${baseUrl}/login/git_oauth`, "get", data => {
  let info = JSON.parse(data.body);
  const requestToken = info.code;
  console.log(requestToken );
  //获取token
  // const get_token = async ctx => {

  
  //   //const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${requestCode}`;

  //   const tokenResponse = await axios({
  //     method: "POST",
  //     url: 'https://github.com/login/oauth/access_token?' +
  //     `client_id=${clientID}&` +
  //     `client_secret=${clientSecret}&` +
  //     `code=${requestToken}`,
  //     headers: {
  //       headers: {
  //         accept: "application/json"
  //       }
  //     }
  //   });

  //   console.log(tokenResponse);
  // };

  // window.location.href = url
  // const accessToken = tokenResponse.data.access_token;
  // console.log(`access token: ${accessToken}`);
});
