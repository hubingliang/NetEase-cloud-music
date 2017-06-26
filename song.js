let audio = document.createElement('audio')
audio.src = 'http://os5560mkh.bkt.clouddn.com/Timbo%20Mehrstein%20Gypsy%20Jazz%20Ensemble%20-%20Pour%20Toi.mp3'
audio.play()
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
window.onerror = function() {
    alert(arguments)
}