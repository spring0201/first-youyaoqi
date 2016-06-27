var tplRanking= require('../templates/ranking.string');
var util = require('../utils/setfocus.js');

SPA.defineView('ranking', {
  html: tplRanking,

    plugins:['delegated',{
      name:'avalon',

      options:function (vm) {
        vm.list =[]
      }
    }],

    init:{
      vm: null,
      rankingSwiper : null
    },
    bindActions: {
      'back': function () {
        this.hide();
      },
      'tap.rankingSwiper.slide': function (e, data) {

        this.rankingSwiper.slideTo($(e.el).index());
      }
    },
    bindEvents:{
      'beforeShow':function(){
          vm = this.getVM();

         $.ajax({
           // url:'/api/getlist.php',
           url:'/first-youyaoqi/mock/ranking.json',

           type: 'get',
           data:{
             rtype: 'ranking'
           },
           success:function(rs){
             vm.list = rs.data;
           }
         });
       },
      'show':function () {
         var that = this;
        var rankScroll = this.widgets['rankScroll'];
        rankScroll.options.scrollX = true;
        rankScroll.options.scrollY = false;

        this.rankingSwiper = new Swiper('#ranking-swiper', {
            loop: false,
            onSlideChangeStart: function (swiper) {
              var index = swiper.activeIndex;
              var $lis = $('.ranking nav li');

              util.setFocus($lis.eq(index));
            }
          });

          // 下拉刷新，上拉加载更多
        var scrollSize = 30;
        var myScroll = this.widgets.rankingScroll;
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
                      vm.list =rs.data.concat(vm.list);
                      myScroll.scrollTo(0, -scrollSize);
                      head.removeClass('up');
                      head.attr('src', '/first-youyaoqi/images/arrow.png');
                    }
                  })

                  // setTimeout(function () {
                  // }, 1000);
              }

              var maxY = this.maxScrollY - this.y;
              var self = this;
              if (maxY > -scrollSize && maxY < 0) {
                  myScroll.scrollTo(0, self.maxScrollY + scrollSize);
                  foot.removeClass('down')
              } else if (maxY >= 0) {
                  foot.attr('src', '/first-youyaoqi/images/ajax-loader.gif');
                  // ajax上拉加载数据
                  $.ajax({
                    url: '/first-youyaoqi/mock/ranking-more.json',
                    data: {
                      rtype: 'rankingMore'
                    },
                    success: function (rs) {
                      vm.list = vm.list.concat(rs.data);
                      myScroll.scrollTo(0, -scrollSize);
                      head.removeClass('up');
                      head.attr('src', '/first-youyaoqi/images/arrow.png');
                    }
                  })
                  // $.ajax({
                  //   url: '/first-youyaoqi/mock/list-more.json',
                  //   data: {
                  //     rtype: 'more'
                  //   },
                  //   success: function (rs) {
                  //     var newArray = that.livelistArray.concat(rs.data);
                  //     that.vm.list = that.formatData(newArray);
                  //     that.livelistArray = newArray;
                  //     myScroll.refresh();
                  //
                  //     myScroll.scrollTo(0, self.y + scrollSize);
                  //     foot.removeClass('down');
                  //     foot.attr('src', '/first-youyaoqi/images/arrow.png');
                  //   }
                  // });
              }
          });
        }
      }
});
