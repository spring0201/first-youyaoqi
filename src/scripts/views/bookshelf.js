var tplBookshelf= require('../templates/bookshelf.string');
var util = require('../utils/setfocus.js');

SPA.defineView('bookshelf', {
  html: tplBookshelf,

  plugins:['delegated'],

  init:{
    bookshelfSwiper : null
  },

  bindActions: {
    'tap.bookshelf.slide': function (e, data) {

      this.bookshelfSwiper.slideTo($(e.el).index());
    }
  },
  bindEvents:{
    'show':function(){
      this.bookshelfSwiper = new Swiper('#bookshelf-hot-swiper', {
            loop: false,
            onSlideChangeStart: function (swiper) {
              var index = swiper.activeIndex;
              var $lis = $('.bookshelf-home nav li');
 
              util.setFocus($lis.eq(index));
            }
          });
    }
  }

});
