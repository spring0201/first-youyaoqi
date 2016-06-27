var tplHome= require('../templates/home.string');

SPA.defineView('home', {
  html: tplHome,

  plugins:['delegated',{
    name:'avalon',
    options:function (vm) {
      vm.list =[]
    }
  }
  ],
  bindActions:{
      'goto.ranking': function () {
        SPA.open('ranking');
      }
    },

  init: {
    vm: null,
    livelistArray: []

  },


   bindEvents:{

     'beforeShow':function(){
       var that = this;

       // 获得vm对象
       that.vm = that.getVM();



        $.ajax({
          // url:'/api/getlist.php',
          url:'/first-youyaoqi/mock/list.json',

          type: 'get',
          data:{
            rtype: 'origin'
          },
          success:function(rs){
            that.vm.list = rs.data;
            var mySwiper = new Swiper('.main-slide', {
                loop: false,
                slidesPerView : 2.5,
                freeMode : true,
                freeModeMomentum : false,
              });
          }
        });
     },

     'show':function(){
        var that = this;

        for(var i=0;i<10;i++){
          var tuijianScroll = that.widgets['remmScroll'+i];
          tuijianScroll.options.scrollX = true;
          tuijianScroll.options.scrollY = false;
        }



         var mySwiper = new Swiper('#banner', {
           loop: true,
           autoplay:3000,
           pagination: '.swiper-pagination',

           paginationHide :true,
         });
           // 下拉刷新，上拉加载更多
         var scrollSize = 30;
         var myScroll = this.widgets.homeScroll;
         myScroll.scrollBy(0, -scrollSize);

         var head = $('.head img'),
             topImgHasClass = head.hasClass('up');
         var foot = $('.foot img'),
             bottomImgHasClass = head.hasClass('down');

         myScroll.on('scroll', function () {
             var y = this.y,
                 maxY = this.maxScrollY - y;
             if (y >= 0) {
                 !topImgHasClass && head.addClass('up');
                 return '';
             }
             if (maxY >= 0) {
                 !bottomImgHasClass && foot.addClass('down');
                 return '';
             }
           });

           myScroll.on('scrollEnd', function () {
               if (this.y >= -scrollSize && this.y < 0) {
                   myScroll.scrollTo(0, -scrollSize);
                   head.removeClass('up');
               } else if (this.y >= 0) {
                   head.attr('src', '/first-youyaoqi/images/ajax-loader.gif');
                   // ajax下拉刷新数据

                   $.ajax({
                     url: '/first-youyaoqi/mock/ranking-refresh.json',
                     data: {
                       rtype: 'rankingRefresh'
                     },
                     success: function (rs) {
                       that.vm.list = rs.data;
                       myScroll.scrollTo(0, -scrollSize);
                       head.removeClass('up');
                       head.attr('src', '/first-youyaoqi/images/arrow.png');
                     }
                   });
               }
           });

     }
   }
});
