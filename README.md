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
    $('#search_box').selectable_input({
                input: function (data, callback) {
                    console.log(data)
                    var arr = []
                    var len = parseInt(Math.random() * 20 + 1)
                    if (len > 10) {
                        for (var i = 0; i < len; i++) {
                            arr.push({
                                id: i,
                                name: '汽车群——' + i,
                            })
                        }
                    }
                    setTimeout(function () {
                        return callback(arr)
                    }, 500)
                },
                select: function (data) {
                    console.log(data)
                },
                multiple: true,
                liClass: 'downSelect_item',
                delay: 1000,
            });
```
