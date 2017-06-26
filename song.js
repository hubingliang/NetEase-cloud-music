let audio = document.createElement('audio')
audio.src = '//os55j7nsx.bkt.clouddn.com/Timbo%20Mehrstein%20Gypsy%20Jazz%20Ensemble%20-%20Pour%20Toi.mp3'
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
window.onerror = function() {
    alert(arguments)
}