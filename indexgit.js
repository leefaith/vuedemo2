const clientID = '0171f09d7192f2b44bf0'
const clientSecret = '443e278cf9c35894a8072a681d8f41b998c64fc8'

const Koa = require('koa');
const route = require('koa-route');
const axios = require('axios');
const cors = require('koa2-cors')
const app = new Koa();



const oauth = async ctx => {
  const requestToken = ctx.request.query.code;
  console.log('authorization code:', requestToken);

  const tokenResponse = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${clientID}&` +
      `client_secret=${clientSecret}&` +
      `code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  });

  const accessToken = tokenResponse.data.access_token;
  console.log(`access token: ${accessToken}`);


  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  });
  console.log(result.data);
  const name = result.data.name;
  ctx.response.redirect(`http://localhost:8080/welcome`);
  
};


app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true
}))

app.use(route.get('http://localhost:8080/login/git_requst_check', oauth));

app.listen(8081);