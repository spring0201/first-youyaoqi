var tplGame= require('../templates/game.string');

SPA.defineView('game', {
  html: tplGame,

  bindEvents:{

   'show':function(){
     var mySwiper = new Swiper('#gamebanner', {
       loop: true,
       autoplay:3000,
       pagination: '.swiper-pagination'
       });
   }
 }
});
