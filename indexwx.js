const APPID = 'wx9b65aad1bf925ceb'
const APPSECRET = '23437b4a2df6ae6b7ce9c436e8bbfed6'

const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
const axios = require('axios');

const app = new Koa();

// 跨域
app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true
}))

const oauth = async ctx => {
  const requestToken = ctx.request.query.code;
  console.log('authorization code:', requestToken);

  const tokenResponse = await axios({
    method: 'post',
    url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`,
    headers: {
      accept: 'application/json'
    }
  });

  const ACCESS_TOKEN = tokenResponse.data.access_token;
  console.log(`access token: ${ACCESS_TOKEN}`);

  const result = await axios({
    method: 'get',
    url: `https://api.weixin.qq.com/sns/auth?access_token=${ACCESS_TOKEN}&openid=${OPENID}`,
  
  });
  console.log(result.data);
  const name = result.data.name;

  ctx.response.redirect(`/welcome?name=${name}`);
};

app.use(main);
app.use(route.get('/gitoauth/redirect', oauth));

app.listen(8081);