# selectable_input
> 这是一个带有下拉框的input 
## 如何使用
> 引入css
 ```html
 <link rel="stylesheet" href="css/selectable_input.css">
 ```
> 引入js
 ```html
    <script src="js/jquery-2.2.1.min.js"></script>
    <script src="js/selectable_input.js"></script>
```
> 使用
```javascript
    $('.search_box').selectable_input({
        //文本框输入后的回调函数
        input:function(data){
            console.log(data)
            var arr = []
            var len = parseInt(Math.random()*20+1)
            if(len>10){
                for(var i=0;i<len;i++){
                    arr.push({
                        id:i,
                        name:'汽车群——'+i,
                    })
                }
            }
            return arr  //此处需要返回一个数组
        },
        //下拉框选择后的回调函数
        select:function(data){
            console.log(data)
        },
        multiple:false,  //是否可以多选
        liClass:'downSelect_item',  //下拉选项Item的class
        delay:1000,  //input 延时毫秒数
    });
```