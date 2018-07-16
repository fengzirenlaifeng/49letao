$(function () {
    // mui('.mui-scroll-wrapper').scroll({
    //     indicators:false
    // });
    /*1. 下拉刷新效果渲染页面  初始化的时候 自己去下拉*/
    /*1.1 初始化下拉刷新组件*/
    /*1.2 当触发下拉回调函数的时候  获取数据 渲染商品详情*/
    new App();
});
var App = function () {
    /*主体容器*/
    this.$scroll = $('.mui-scroll');
    this.init();
};
App.prototype.init = function () {
    var _this = this;
    /*初始化组件*/
    mui.init({
        pullRefresh:{
            indicators:false,
            container:'.mui-scroll-wrapper',
            down:{
                auto:true,
                callback:function () {
                    var that = this;
                    _this.render(function(){
                        //结束下拉刷新效果
                        that.endPulldownToRefresh();
                    });
                }
            }
        }
    });
};
App.prototype.render = function (callback) {
    var _this = this;
    /*渲染商品详情*/
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:lt.getParamsByUrl().productId
        },
        dataType:'json',
        success:function (data) {
            /*模拟加载时间*/
            setTimeout(function () {
                /*渲染*/
                _this.$scroll.html(template('detail',data));
                /*初始化轮播图*/
                mui('.mui-slider').slider();
                /*回调*/
                callback && callback();
            },500);
        }
    });
}