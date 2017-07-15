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
                 $tabitem.attr('data-downloaded', 'yes')
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
                 $.get('../songs.json').then(function(response) {
                     $tabitem.attr('data-downloaded', 'yes')
                     let items = response
                     items.forEach(i => {
                         let $li = $(
                             `
               <li class="hot-item">
                            <a class="link" href="./song.html?id=${i.id}">${i.name}</a>
                        </li>
					`
                         )
                         $('.list').append($li)
                     })
                 })
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
                         let $li = $(`    <a href="./song.html?id=${item.id}">
                        <div class="items">
                            <div class="left">
                                <p class="name">${item.name}</p>
                                <p class="author">${item.author} - ${item.album}</p>
                            </div>
                            <div class="right">
                                <span></span>
                            </div>
                        </div>
                    </a>`)
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
             var database = [{
                     "id": 1,
                     "name": "晚春",
                     "author": "腰乐队",
                     "album": "相见恨晚",
                 },
                 {
                     "id": 2,
                     "name": "大石碎胸口",
                     "author": "万能青年旅店",
                     "album": "万能青年旅店",
                 },
                 {
                     "id": 3,
                     "name": "The Good The Bad And The Ugly",
                     "author": "Geoff Love",
                     "album": "Great Western Themes",
                 },
                 {
                     "id": 4,
                     "name": "λ",
                     "author": "尚先生",
                     "album": "白日梦",
                 },
                 {
                     "id": 5,
                     "name": "Where Is My Mind",
                     "author": "Pixies",
                     "album": "Essential Soundtracks: The New Movie Collection",
                 },
                 {
                     "id": 6,
                     "name": "山海",
                     "author": "草东没有派对",
                     "album": "丑奴儿",
                 },
                 {
                     "id": 7,
                     "name": "下雨&董卓瑶&忽然(2014i/O版)",
                     "author": "李志",
                     "album": "i/O（2014 Live）",
                 },
                 {
                     "id": 8,
                     "name": "旧情人，我是时间的新欢",
                     "author": "尧十三",
                     "album": "飞船，宇航员",
                 },
                 {
                     "id": 9,
                     "name": "黄昏",
                     "author": "Timbo Mehrstein Gypsy Jazz Ensemble ",
                     "album": "Maré Tchavengé",
                 },
                 {
                     "id": 10,
                     "name": "California Dreaming (重庆森林)",
                     "author": "The Papas/The Mamas",
                     "album": "声光回忆",
                 }
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