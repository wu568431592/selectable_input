(function ($) {
    $.fn.selectable_input = function (opt) {
        var old_search_data = null
        var placeholder = opt.placeholder || '请输入相关的问句';
        var submitText = opt.submitText || '选好了';
        var ele = $(this)
        function init() {
            var html = '<input type="text" placeholder="' + placeholder + '" data-canclear="true">\n' +
                '       <span>x</span>\n' +
                '<div class="down">'+
                '       <ul class="downSelect">\n' +
                '       </ul></div>\n'
            ele.append(html);
            ele.addClass('search_box')
        }
        init()
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
        ele.on('input', 'input[type="text"]', function () {
            var that = this
            setTimeout(function () {
                if (canSearch) {
                    $(that).attr('data-canclear', true);
                    if ($(that).val().trim().length > 0) {
                        var data = ''
                        clearTimeout(timer);
                        timer = setTimeout(function(){
                            var callback = function(data){
                                old_search_data = data;
                                var html = ''
                                if(data.length>0){
                                    for(var i = 0; i<data.length; i++){
                                        if(opt.multiple){
                                            if(data[i].checked){
                                                html += '<li class="'+opt.liClass+'"><label><input type="checkbox" data-id="'+data[i].id+'" checked>'+data[i].name+'</label></li>'
                                            }else{
                                                html += '<li class="'+opt.liClass+'"><label><input type="checkbox" data-id="'+data[i].id+'">'+data[i].name+'</label></li>'
                                            }
                                        }else{
                                            html += '<li class="'+opt.liClass+'"  data-id="'+data[i].id+'">'+data[i].name+'</li>'
                                        }
                                    }
                                    ele.find('.down ul').empty().append(html).css('padding-bottom','30px');
                                    ele.find('.down').show();
                                }else{
                                    html += '<li class="nodata">暂无数据</li>'
                                    ele.find('.checked').remove()
                                    ele.find('.down ul').empty().append(html).css('padding-bottom','0px');
                                    ele.find('.down').show();
                                }
                                if(opt.multiple && ele.find('.checked').length == 0 && data.length>0){
                                    ele.find('.down').append('<div class="checked"><a href="#">' + submitText + '</a></div>')
                                }
                            }
                            opt.input($(that).val(),callback)
                        }, opt.delay|| 1000)
                    } else {
                        ele.find('span').hide();
                        ele.find('.down').hide();
                    }
                }
            }, 0)
        })
        ele.on('blur', 'input', function () {
            if(!opt.multiple){
                if ($(this).attr('data-canclear') == 'true') {
                    $(this).val('')
                    ele.find('span').hide();
                }
            }
        })
        $('body').on('click', function (e) {
            e.stopPropagation();
            if (!$(e.target).hasClass(opt.liClass)) {
                ele.find('.down').hide();
            }
        })
        ele.on('click', '.'+ opt.liClass, function (e) {
            if(opt.multiple){
                e.stopPropagation()
            }else{
                var text = $(this).text();
                ele.find('input').val(text).attr('data-canclear', false);
                ele.find('span').show();
                $(this).parent().parent().hide();
                opt.select(text)
            }
        })
        ele.on('click', 'span', function () {
            ele.find('input').val('').attr('data-canclear', true);
            $(this).hide();
        })
        ele.on('click','.checked',function(){
            var list = $('ul input[type = "checkbox"]:checked')
            var arr = []
            for(var i = 0;i<list.length; i++){
                arr.push({
                    id:$(list[i]).attr('data-id'),
                    name:$(list[i]).parent().text()
                })
            }
            ele.find('input[type="text"]').val('')
            var old_select_data = old_search_data.filter(function(item){
                return item.checked
            })
            opt.select(arr,old_select_data)
        })
    }
})(jQuery)
