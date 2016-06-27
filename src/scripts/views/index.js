var tplIndex = require('../templates/index.string');

var util = require('../utils/setfocus.js');

SPA.defineView('index', {
  html: tplIndex,

  modules:[{
    name:"content",
    views:['my','home','recommend','bookshelf','game'],
    defaultTag:'home',
    container:'.l-container'
  }],

  plugins:['delegated'],

  bindActions:{
    'switch.tabs': function (e,data) {
      util.setFocus(e.el);
      this.modules.content.launch(data.tag);
    }
  }
});

// $(function(){
//
//
//
// })
