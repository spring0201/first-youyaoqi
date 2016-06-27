var tplGuide= require('../templates/guide.string');

SPA.defineView('guide', {
  html: tplGuide,

  plugins:['delegated'],

  bindActions:{
    'goto.index': function () {

      SPA.open('index');
    }
  },

  bindEvents:{
    show:function(){
      var mySwiper = new Swiper('.guide', {
            loop: false
          });
    }
  }
});
