let audio = document.createElement('audio')
audio.src = '//dl.stream.qqmusic.qq.com/C1L00030AmKd2gIrYj.m4a?fromtag=38'
audio.oncanplay = function() {
    audio.play()
    $('#play').css('display', 'none')
}
$('#cover').on('touchstart', function() {
    audio.pause()
    $('.cover').css('animation-play-state', 'paused')
    $('.disc_light').css('animation-play-state', 'paused')
    $('#play').css('display', '')
    $('.needle').removeClass('movein')
    $('.needle').addClass('moveout')

})
$('#play').on('touchstart', function() {
    audio.play()
    $('.cover').css('animation-play-state', '')
    $('.disc_light').css('animation-play-state', '')
    $('#play').css('display', 'none')
    $('.needle').removeClass('moveout')
    $('.needle').addClass('movein')

})







let cover = $('.cover')
let deg = 0
let rotate = function() {
    deg = deg + 1.8
    cover.css('transform', `rotateZ(${deg}deg)`)
}
let coverRotate = setInterval(function() {
    deg = deg + 1.8
    cover.css('transform', `rotateZ(${deg}deg)`)
}, 100)