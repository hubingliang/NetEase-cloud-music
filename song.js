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

$(function() {
    $.get('songs.json').then(function(object) {
        let { lyric } = object[0]
        let array = lyric.split('\n')
        console.log(array)
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