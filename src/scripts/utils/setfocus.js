var util =  {
  setFocus: function (e){
    $(e).addClass('active').siblings().removeClass('active');
  }
}
module.exports = util;
