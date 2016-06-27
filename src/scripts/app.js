// 引入spa类库
require('./lib/spa.min.js');
require('./lib/iscroll-probe.js');
require('./lib/swiper-3.3.1.min.js');

// 引入views
require('./views/index.js');
require('./views/guide.js');
require('./views/home.js');
require('./views/ranking.js');
require('./views/my.js');
require('./views/login.js');
require('./views/bookshelf.js');
require('./views/game.js');
require('./views/recommend.js');
require('./views/login.js');
require('./views/reg.js');





// SPA设置
SPA.config({
  indexView: 'guide'
});
