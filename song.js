$(function() {

    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1], 10)
    $.get('./songs.json').then(function(response) {
        let songs = response
        let song = songs.filter(s => s.id === id)[0]
        let { url, name, lyric, id } = song
        console.log(id)
            //歌词处理
        let array = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        array = array.map(function(string, index) {
            let matches = string.match(regex)
            if (matches) {
                return { time: matches[1], words: matches[2] }
            }
        })
        let $lyric = $(".lyric-box")
        array.map(function(object) {
            let $p = $('</p>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lyric)
        })

        let $cover = $('.cover')
        $cover.attr('src', `cover${id}`)


    })
    let audio = document.createElement('audio')
    audio.src = '//dl.stream.qqmusic.qq.com/C400003TEnl83gBNge.m4a?vkey=255D47EF6567AD5302A31F136F3AC6D57EDB18EF2F536B2D00B0ACFF3A158E171046E52681CB235DB7B6170C245AAF0FE3711B9AA07DBE1A&guid=7561507023&uin=1104524352&fromtag=66'
    $('#cover').on('touchstart', function() {
        audio.pause()
        $('.cover').addClass('norotate')
        $('.disc_light').addClass('norotate')
        $('#play').css('display', '')
        $('.needle').removeClass('movein')
        $('.needle').addClass('moveout')

    })
    $('#play').on('touchstart', function() {
        audio.play()
        $('.cover').addClass('rotate').removeClass('norotate')
        $('.disc_light').addClass('rotate').removeClass('norotate')
        $('#play').css('display', 'none')
        $('.needle').removeClass('moveout')
        $('.needle').addClass('movein')

    })
    setInterval(() => {
        let seconds = audio.currentTime
        let munites = ~~(seconds / 60)
        let left = seconds - munites * 60
        let time = `${pad(munites)}:${pad(left)}`
        let $lyric = $('.lyric>.lyric-box>p')
        let $whichLine
        for (let i = 0; i < $lyric.length; i++) {
            let currentLineTime = $lyric.eq(i).attr('data-time')
            let nextLineTime = $lyric.eq(i + 1).attr('data-time')
            if ($lyric.eq(i + 1).length !== 0 && currentLineTime < time && nextLineTime > time) {
                $whichLine = $lyric.eq(i)
                break
            }
        }
        if ($whichLine) {
            $whichLine.addClass('active').prev().removeClass('active')
            let top = $whichLine.offset().top
            let linesTop = $('.lyric-box').offset().top
            let delta = top - linesTop - $('.lyric').height() / 3
            $('.lyric-box').css('transform', `translateY(-${delta}px)`)
        }

    }, 100)

    function pad(number) {
        return number >= 10 ? number + '' : '0' + number
    }
})