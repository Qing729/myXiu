;(function () {
    $.extend({
        toJSON: function (str) {
            var resultArr = [];
            if (str.indexOf("&") != -1) {
                var arr = str.split("&");
                for (var key in arr) {
                    var obj = {};
                    var arrlist = arr[key].split("=");
                    obj[arrlist[0]] = arrlist[1];
                    resultArr.push(obj);
                }
            } else {
                var obj = {};
                var arr = str.split("=");
                obj[arr[0]] = arr[1];
                resultArr.push(obj);
            }
            return resultArr;
        }
    })
})(jQuery);
