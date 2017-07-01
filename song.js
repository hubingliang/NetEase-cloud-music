$(function() {
    let audio = document.createElement('audio')
    audio.src = 'http://ac-3k2xcvwp.clouddn.com/f9b1df94c63d4d10b004.mp3'
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
        let $lines = $('.lines> p')
        let $whichLine
        for (let i = 0; i < $lines.length; i++) {
            let currentLineTime = $lines.eq(i).attr('data-time')
            let nextLineTime = $lines.eq(i + 1).attr('data-time')
            if ($lines.eq(i + 1).length !== 0 && currentLineTime < time && nextLineTime > time) {
                $whichLine = $lines.eq(i)
                break
            }
        }
        if ($whichLine) {
            $whichLine.addClass('active').prev().removeClass('active')
            let top = $whichLine.offset().top
            let linesTop = $('.lines').offset().top
            let delta = top - linesTop - $('.lyric').height() / 3
            $('.lines').css('transform', `translateY(-${delta}px)`)
        }
    }, 300)

    function pad(number) {
        return number >= 10 ? number + '' : '0' + number
    }
    $.get('songs.json').then(function(object) {
        let { lyric } = object[0]
        let array = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        array = array.map(function(string, index) {
            let matches = string.match(regex)
            if (matches) {
                return { time: matches[1], words: matches[2] }
            }
        })
        let $lyric = $(".lyric")
        array.map(function(object) {
            let $p = $('</p>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lyric)
        })
    })
})

//fangfang