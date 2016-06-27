var tplLogin= require('../templates/login.string');

SPA.defineView('login', {
  html: tplLogin,

  plugins:['delegated'],

  bindActions:{
      'goto.my': function () {
        SPA.open('my');
      }
    }
});
