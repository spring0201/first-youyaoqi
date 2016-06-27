var tplReg= require('../templates/reg.string');

SPA.defineView('reg', {
  html: tplReg,

  plugins:['delegated'],

  bindActions:{
      'goto.login': function () {
        SPA.open('login');
      }
    }
});
