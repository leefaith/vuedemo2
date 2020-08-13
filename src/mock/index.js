import Mock from "mockjs";
const Random = Mock.Random;
const baseUrl = "http://localhost:8080";
//获取验证码
Mock.mock(`${baseUrl}/login/code_request`, "get", data => {
  let info = JSON.parse(data.body);
  let code;
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
  let  info = JSON.parse(data.body);
  console.log(info);
  const redirect_uri = info.redirect_uri 
  const client_id = "c27b8b3952f2204fc51d";
  const authorize_uri = "https://github.com/login/oauth/authorize";
  const href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
  console.log(href);
  return {
    //href
  };
});
//git 重定向
Mock.mock(`${baseUrl}/oauth/redirect`, "get", oauth=> {
  console.log(oauth);
});


//git请求授权
Mock.mock(`${baseUrl}/login/git_oauth`, "get", data => {

});
