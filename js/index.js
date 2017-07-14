 $(function() {
     setTimeout(function() {
         $.get('../songs.json').then(function(response) {
             let items = response
             items.forEach(i => {
                 let $li = $(
                     `
                <a href="./song.html?id=${i.id}">
                        <div class="items">
                            <div class="left">
                                <p class="name">${i.name}</p>
                                <p class="author">${i.author} - ${i.album}</p>
                            </div>
                            <div class="right">
                                <span></span>
                            </div>
                        </div>
                    </a>
					`
                 )
                 $('#lastestMusic').append($li)
             })
             $('#lastestMusicLoading').remove()
         })
     }, 1000)





     $('.nav').on('click', 'ol.tabItems>li', function(e) {
         let $tabname = $(e.currentTarget).children().addClass('selected')
         $tabname.parents().siblings().children().removeClass('selected')
         let index = $(e.currentTarget).attr('number')
         $('.content > .tabitem').eq(index).addClass('active').siblings().removeClass('active')
         let $tabitem = $('.content > .tabitem').eq(index)
         if ($tabitem.attr('data-downloaded') === 'yes') {
             return
         }
         setTimeout(function() {
             if (index === '1') {
                 $.get('../songs.json').then(function(response) {
                     let items = response
                     items.forEach(i => {
                         let red = function(id) {
                             let hot
                             if (id < 4) {
                                 hot = `red`
                             } else {
                                 hot = ' '
                             }
                             console.log(hot)
                             return hot
                         }
                         let number = function(id) {
                             let count
                             if (id < 10) {
                                 count = '0' + id
                             } else {
                                 count = id
                             }
                             console.log(count)
                             return count
                         }
                         let count = number(i.id)
                         let hot = red(i.id)
                         let $li = $(
                             `
                    <a href="./song.html?id=${i.id}">
                        <div class="${hot} number">${count}</div>
                        <div class="items">
                            <div class="left">
                                <p class="name">${i.name}</p>
                                <p class="author">${i.author} - ${i.album}</p>
                            </div>
                            <div class="right">
                                <span></span>
                            </div>
                        </div>
                    </a>
					`
                         )
                         $('.hotcontent').append($li)
                     })
                 })
             } else if (index === '2') {
                 return
             }
         }, 500)
     })


     let timer = undefined
     $('input#searchSong').on('input', function(e) {
         let $input = $(e.currentTarget)
         let value = $input.val().trim()
         if (value === '') {
             return
         }
         if (timer) {
             clearTimeout(timer)
         }

         timer = setTimeout(function() {
             search(value).then((result) => {
                 timer = undefined
                 if (result.length !== 0) {
                     $('#output').empty()
                     let $ul = $('<ul></ul>')
                     result.forEach((item) => {
                         let $li = $(`<li><a href="./song.html?id=${item.id}">${item.name}</a></li>`)
                         $li.appendTo($ul)
                     })
                     $('#output').append($ul)
                 } else {
                     $('#output').html('没有结果')
                 }
             })
         }, 500)


     })

     function search(keyword) {
         return new Promise((resolve, reject) => {
             var database = [
                 { "id": 1, "name": "晚春", },
                 { "id": 2, "name": "大石碎胸口", },
                 { "id": 3, "name": "The Good The Bad And The Ugly", },
                 { "id": 4, "name": "λ", },
                 { "id": 5, "name": "Where Is My Mind", },
                 { "id": 6, "name": "山海", },
                 { "id": 7, "name": "下雨&董卓瑶&忽然(2014i/O版)", },
                 { "id": 8, "name": "旧情人，我是时间的新欢", },
                 { "id": 9, "name": "黄昏", },
                 { "id": 10, "name": "California Dreaming (重庆森林)", }
             ]
             let result = database.filter(function(item) {
                 return item.name.indexOf(keyword) >= 0
             })
             setTimeout(function() {
                 resolve(result)
             }, (Math.random() * 200 + 1000))
         })
     }
     window.search = search
 })