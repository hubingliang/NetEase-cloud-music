$(function() {
    let audio = document.createElement('audio')
    audio.src = '//dl.stream.qqmusic.qq.com/C400000t3PX00d53oD.m4a?vkey=EBF64FD3BE7C38CBEEE90E19890CCCFC2B1036D2FC146C78DC8BB9AD5544A6A991396DAAB29334806AA7D31A1FCA2F38C0EEBBE9112B69B5&guid=7561507023&uin=1104524352&fromtag=66'
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
        let $lyric = $('.lyric>.lyric-box')
        console.log($lyric)
        let $whichLine
        for (let i = 0; i < $lyric.length; i++) {
            let currentLineTime = $lyric.eq(i).attr('data-time')
            let nextLineTime = $lyric.eq(i + 1).attr('data-time')
            if ($lines.eq(i + 1).length !== 0 && currentLineTime < time && nextLineTime > time) {
                $whichLine = $lines.eq(i)
                break
            }
            if ($whichLine) {
                let height = $('.lyric>.lyric-box>p').height()
                $('.lyric').css('transform', `translateY(-${height}px)`)
            }
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
        let $lyric = $(".lyric-box")
        array.map(function(object) {
            let $p = $('</p>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lyric)
        })
    })
})

//fangfang