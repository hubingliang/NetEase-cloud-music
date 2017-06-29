 setTimeout(function() {
     $.get('./songs.json').then(function(response) {
         let items = response
         items.forEach(i => {
             let $li = $(
                 `
                <a href="./song.html?id=${i.id}">
                        <div class="items">
                            <div class="left">
                                <p class="name">${i.name}</p>
                                <p class="author">Sean Hayes - Run Wolves Run</p>
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