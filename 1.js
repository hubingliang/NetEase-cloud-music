"use strict";
$(function() {
    function n(n) {
        return new Promise(function(e, t) {
            var i = [{ id: 1, name: "晚春" }, { id: 2, name: "大石碎胸口" }, { id: 3, name: "The Good The Bad And The Ugly" }, { id: 4, name: "λ" }, { id: 5, name: "Where Is My Mind" }, { id: 6, name: "山海" }, { id: 7, name: "下雨&董卓瑶&忽然(2014i/O版)" }, { id: 8, name: "旧情人，我是时间的新欢" }, { id: 9, name: "黄昏" }, { id: 10, name: "California Dreaming (重庆森林)" }].filter(function(e) { return e.name.indexOf(n) >= 0 });
            setTimeout(function() { e(i) }, 200 * Math.random() + 1e3)
        })
    }
    setTimeout(function() {
        $.get("../songs.json").then(function(n) {
            n.forEach(function(n) {
                var e = $('\n                <a href="./song.html?id=' + n.id + '">\n                        <div class="items">\n                            <div class="left">\n                                <p class="name">' + n.name + '</p>\n                                <p class="author">' + n.author + " - " + n.album + '</p>\n                            </div>\n                            <div class="right">\n                                <span></span>\n                            </div>\n                        </div>\n                    </a>\n\t\t\t\t\t');
                $("#lastestMusic").append(e)
            }), $("#lastestMusicLoading").remove()
        })
    }, 1e3), $(".nav").on("click", "ol.tabItems>li", function(n) {
        $(n.currentTarget).children().addClass("selected").parents().siblings().children().removeClass("selected");
        var e = $(n.currentTarget).attr("number");
        $(".content > .tabitem").eq(e).addClass("active").siblings().removeClass("active"), "yes" !== $(".content > .tabitem").eq(e).attr("data-downloaded") && setTimeout(function() {
            if ("1" === e) $.get("../songs.json").then(function(n) {
                var e = function(n) { var e = void 0; return e = n < 10 ? "0" + n : n, console.log(e), e },
                    t = function(n) { var e = void 0; return e = n < 4 ? "red number" : "number", console.log(e), e };
                n.forEach(function(n) {
                    e(n.id), t(n.id);
                    var i = $('\n                <a href="./song.html?id=' + n.id + '">\n                        <div class=' + t + ">" + count + '</number>\n                        <div class="items">\n                            <div class="left">\n                                <p class="name">' + n.name + '</p>\n                                <p class="author">' + n.author + " - " + n.album + '</p>\n                            </div>\n                            <div class="right">\n                                <span></span>\n                            </div>\n                        </div>\n                    </a>\n\t\t\t\t\t');
                    $(".hotcontent").append(i)
                })
            });
            else if ("2" === e) return
        }, 500)
    });
    var e = void 0;
    $("input#searchSong").on("input", function(t) {
        var i = $(t.currentTarget).val().trim();
        "" !== i && (e && clearTimeout(e), e = setTimeout(function() {
            n(i).then(function(n) {
                if (e = void 0, 0 !== n.length) {
                    $("#output").empty();
                    var t = $("<ul></ul>");
                    n.forEach(function(n) { $('<li><a href="./song.html?id=' + n.id + '">' + n.name + "</a></li>").appendTo(t) }), $("#output").append(t)
                } else $("#output").html("没有结果")
            })
        }, 500))
    }), window.search = n
});
"use strict";
$(function() {
    var t = parseInt(location.search.match(/\bid=([^&]*)/)[1], 10);
    $.get("./songs.json").then(function(e) {
        function a(t) { return t >= 10 ? t + "" : "0" + t }
        var r = e.filter(function(e) { return e.id === t })[0],
            o = r.url,
            s = r.name,
            n = r.lyric,
            c = (r.album, r.author),
            i = n.split("\n"),
            l = /^\[(.+)\](.*)$/;
        i = i.map(function(t, e) { var a = t.match(l); if (a) return { time: a[1], words: a[2] } });
        var d = $(".lyric-box");
        i.map(function(t) {
            var e = $("</p>");
            e.attr("data-time", t.time).text(t.words), e.appendTo(d)
        }), $(".cover").attr("src", "cover/" + t + ".jpg"), $(".cover-back").css("background-image", "url(cover/b" + t + ".jpg)"), $(".name").html("" + s), $(".author").html("" + c);
        var v = document.createElement("audio");
        v.src = o, $("#cover").on("touchstart", function() { v.pause(), $(".cover").addClass("norotate"), $(".disc_light").addClass("norotate"), $("#play").css("display", ""), $(".needle").removeClass("movein"), $(".needle").addClass("moveout") }), $("#play").on("touchstart", function() { v.play(), $(".cover").addClass("rotate").removeClass("norotate"), $(".disc_light").addClass("rotate").removeClass("norotate"), $("#play").css("display", "none"), $(".needle").removeClass("moveout"), $(".needle").addClass("movein") }), setInterval(function() {
            for (var t = v.currentTime, e = ~~(t / 60), r = t - 60 * e, o = a(e) + ":" + a(r), s = $(".lyric>.lyric-box>p"), n = void 0, c = 0; c < s.length; c++) {
                var i = s.eq(c).attr("data-time"),
                    l = s.eq(c + 1).attr("data-time");
                if (0 !== s.eq(c + 1).length && i < o && l > o) { n = s.eq(c); break }
            }
            if (n) {
                n.addClass("active").prev().removeClass("active");
                var d = n.offset().top - $(".lyric-box").offset().top - $(".lyric").height() / 3;
                $(".lyric-box").css("transform", "translateY(-" + d + "px)")
            }
        }, 100)
    })
});