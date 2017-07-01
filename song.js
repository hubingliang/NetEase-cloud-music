$(function() {
    let audio = document.createElement('audio')
    audio.src = '//dl.stream.qqmusic.qq.com/C400001bdYk41BCfRi.m4a?vkey=44AB4B5473389FED1BE23D586D160DE3C79C2BF5AE1D02C6627140C4B2DF68430DB45C43139E4FDCA14241B5DAF54F12C8AD89600E6E1789&guid=7561507023&uin=1104524352&fromtag=66'
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
        console.log($whichLine)
        if ($whichLine) {
            $whichLine.addClass('active').prev().removeClass('active')
            let height = $('.lyric>.lyric-box>p').height()
            console.log(height)
            $('.lyric-box').css('transform', `translateY(-${height}px)`)
        }

    }, 300)

    function pad(number) {
        return number >= 10 ? number + '' : '0' + number
    }
    $.get('songs.json').then(function(object) {
        let { lyric } = object[5]
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
    })
})

//fangfang