module.exports = {
    devServer: {
      before:require('./src/mock/index.js')  //引入mock/index.js
    }
  }