//首页幻灯片自动播放插件
jQuery.fn.runBanner = function (params) {

    var pb = params || {
        className: "show",//样式名称
        child: "flashBanner",//对象ID名称
        runTimeNum:3000
    };

    var _className = pb.className;
    var _child = $("#" + pb.child);
    var _runTimeNum = pb.runTimeNum;
    var _runTime;
    var _showNum = 0;
    var _bannerNum = _child.children('ul').children().length;
    var _nOldNum;
    var _tMouseOutTime;

    _child.find("ol li").each(function(index){
        $(this).click(function(e){
            _showNum = index;
            clearTimeout(_runTime);
            showRunBnner();
        });
    });

    _child.mouseover(function(e){
        _nOldNum = _showNum;
        clearTimeout(_tMouseOutTime);
        clearTimeout(_runTime);
    }).mouseout(function(e){
        _tMouseOutTime = setTimeout(function(){
            _showNum = _nOldNum;
            showRunBnner();
        },1000);
    });


    /*_child.find("ol li").each(function (index) {
        $(this).click(function () {
            bindTime = setTimeout(function () {
                _showNum = index;
                clearTimeout(_runTime);
                showRunBnner();
            }, 300);
        }).mouseout(function () {
            clearTimeout(bindTime);
        });
    });
    
    _child.find("ul li").each(function (index) {
        $(this).mouseover(function () {
            bindTime = setTimeout(function () {
                _showNum = index
                clearTimeout(_runTime);
            }, 300);
        }).mouseout(function () {
            setTimeout(function(){
                clearTimeout(bindTime);
                clearTimeout(_runTime);
                showRunBnner();
            },1000);
            
            //setTimeout(showRunBnner,1000);
        });
    });*/
    
    var showRunBnner = function () {
        _child.find("ul li").eq(_showNum).fadeIn("slow").siblings().fadeOut("slow");
        _child.find("ol li").eq(_showNum).addClass(_className).siblings().removeClass(_className);
        _runTimeNum = _child.find("ul li").eq(_showNum).attr("data-time") || pb.runTimeNum;

        _showNum++;

        if (_showNum >= _bannerNum || _showNum < 0) {
            _showNum = 0;
        }

        _runTime = setTimeout(showRunBnner, _runTimeNum);
    }

    showRunBnner();
}
