(function ($) {
    $.fn.selectable_input = function (opt) {
        var ele = $(this)
        function init() {
            var html = '<input type="text" placeholder="请输入相关的问句" data-canclear="true">\n' +
                '       <span>x</span>\n' +
                '       <ul class="downSelect">\n' +
                '       </ul>\n'
            ele.append(html)
        }
        init()
        var debounce = function (fn, delay) {
            /* fn 函数
             * delay 延迟时间 */
            var timeout;
            return function () {
                console.log(this)
                var self = this;
                var args = arguments;
                window.clearTimeout(timeout);
                timeout = window.setTimeout(function () {
                    fn.apply(self, args);
                }, delay);
            }
        };
        var canSearch = true;
        ele.on('compositionstart', 'input', function () {
            // 中文输入法输入时触发
            canSearch = false
        })
        ele.on('compositionend', 'input', function () {
            // 中文选词结束后
            canSearch = true
        })
        var timer = ''
        ele.on('input', 'input', function () {
            var that = this
            setTimeout(function () {
                if (canSearch) {
                    $(that).attr('data-canclear', true);
                    if ($(that).val().trim().length > 0) {
                        var data = ''
                        clearTimeout(timer);
                        timer = setTimeout(function(){
                            data = opt.input($(that).val())
                            var html = ''
                            if(data.length>0){
                                for(var i = 0; i<data.length; i++){
                                    html += '<li class="'+opt.liClass+'">'+data[i]+'</li>'
                                }
                            }else{
                                html += '<li class="nodata">暂无数据</li>'
                            }

                            $(that).siblings('ul').empty().append(html).show();
                        },1000)

                    } else {
                        ele.find('span').hide();
                        $(that).siblings('ul').hide();
                    }
                }
            }, 0)
        })
        ele.on('blur', 'input', function () {
            if ($(this).attr('data-canclear') == 'true') {
                $(this).val('')
                ele.find('span').hide();
            }
        })
        $('body').on('click', function (e) {
            e.stopPropagation();
            if (!$(e.target).hasClass(opt.liClass)) {
                $('.downSelect').hide();
            }
        })
        ele.on('click', '.' + opt.liClass, function () {
            var text = $(this).text();
            ele.find('input').val(text).attr('data-canclear', false);
            ele.find('span').show();
            $(this).parent().hide();
            opt.select(text)
        })
        ele.on('click', 'span', function () {
            ele.find('input').val('').attr('data-canclear', true);
            $(this).hide();
        })


    }
})(jQuery)