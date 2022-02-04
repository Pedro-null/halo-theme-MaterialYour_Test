(function () {
    $.ajax({
        url: '/api/content/themes/activation/settings',
        type: 'GET',
        dataType: 'json',
        async: false,
        crossDomain: true,
        headers: {
            "API-Authorization": my_acess,
        },
        success: function (data) {
            if(data.data.music != undefined){
                av = data.data.music.split(',');
                for(var i = 0;i < av.length;i++){
                    var zs = av[i].lastIndexOf('#*#');
                    // console.log(av[i].slice(0,zs)); // 歌曲链接
                    // console.log(av[i].slice(zs+3)); // 歌曲名
                    $('#mp-list ul').append('<li data-src="'+av[i].slice(0,zs).replace(/[\n]/g,'')+'" class="">'+av[i].slice(zs+3)+'</li>');
                }
            }
        },
        error: function () {
            mdui.snackbar({
                message: '音乐初始化错误',
                position: 'right-top',
            });
        }
    });
    var $mpMusic = $('#mp-music');
    if ($mpMusic.length === 0) return;

    var $mpMusicWrap = $('#mp-music-wrapper'),
        $musicAlbum = $('#mp-music-album'),
        $hidePanel = $('#mp-hide-panel'),
        $play = $('#mp-music-play'),
        $next = $('#mp-music-next'),
        $prev = $('#mp-music-prev'),
        $volume = $('#mp-music-volume'),
        $btnList = $('#mp-music-list'),
        $panList = $('#mp-list'),
        $listItems = $panList.find('li'),
        autoPlay = $mpMusic.data("autoplay"),
        autoPlayNext = $mpMusic.data("autoplaynext"),
        autoOpenList = true,
        panListWidth = '250px';

    if ($listItems.length) {
        $($listItems[0]).addClass('current');
    } else {
        //没有歌曲,不用初始化,隐藏播放按钮
        $mpMusic.hide(300);
        return;
    }

    var music = new Audio();
    music.addEventListener('ended', function () {
        toPause();
        if (autoPlayNext === "yes") {
            toNext();
        }
    }, false);

    $volume.on('click', function () {
        changeVolume();
    });

    $play.on('click', function () {
        if (!music.src) {
            music.src = $($listItems[0]).data('src');
            $($listItems[0]).addClass('current');
        }
        music.paused ? toPlay() : toPause();
    });

    $next.on('click', function () {
        toNext();
    });
    $prev.on('click', function () {
        toPrev();
    });

    $listItems.on('click', function () {
        var src = $(this).data('src');
        if (src) {
            music.src = src;
            toPlay();
            $listItems.removeClass('current');
            $(this).addClass('current')
        }
    });

    $btnList.on('click', function (e) {
        if ($panList.css('display') !== 'none') {
            $panList.animate({'width': '0px'}, 200, function () {
                $panList.hide();
            });
            autoOpenList = true;
        } else {
            $panList.show().animate({'width': panListWidth}, 200);
            autoOpenList = false;
        }
    });


    $musicAlbum.on('click', function (e) {
        if ($mpMusicWrap.hasClass('open')) {
            closeMusicPanel();
        } else {
            openMusicPanel();
        }

        //点击其他地方关闭播放板
        $(document).one("click", function () {
            closeMusicPanel();
        });
        $mpMusicWrap.on('click', function (e) {
            e.stopPropagation();
        })
    });

    var changeVolume = function () {
        if (music.muted) {
            music.muted = false;
            $volume.find('i').html('volume_up')
        } else {
            music.muted = true;
            $volume.find('i').html('volume_off')
        }
    };

    var toPlay = function () {
        if (!music.src) return;
        music.play();
        if (music.paused) return;
        playing(true);
        $play.find('i').html('pause_circle_filled');
    };

    var toPause = function () {
        music.pause();
        playing(false);
        $play.find('i').html('play_circle_filled');
    };

    var toNext = function () {
        if ($listItems.length == 0) {
            alert('No songs！');
            return;
        }
        var current = $panList.find('.current');
        if (current.length) {
            var next = current.next('li');
            if (next.length) {
                toPlayItem(next);
                return;
            }
        }
        toPlayItem($($listItems[0]))
    };

    var toPrev = function () {
        if ($listItems.length == 0) {
            alert('No songs ！');
            return;
        }
        var current = $panList.find('.current');
        if (current.length) {
            var prev = current.prev('li');
            if (prev.length) {
                toPlayItem(prev);
                return;
            }
        }
        toPlayItem($($listItems[$listItems.length - 1]))
    };

    var toPlayItem = function ($item) {
        $listItems.removeClass('current');
        $item.addClass('current');
        music.src = $item.data('src');
        toPlay();
    };

    var closeMusicPanel = function () {
        if ($panList.css('display') !== 'none') {
            $panList.animate({'width': '0px'}, 200, function () {
                $panList.hide();
                closeHidePanel();
            })
        } else {
            closeHidePanel();
        }
    };

    var openMusicPanel = function () {
        $mpMusicWrap.addClass('mp-mdl-shadow--2dp open');
        $hidePanel.slideDown(200, function () {
            if (!autoOpenList) {
                $panList.show().animate({'width': panListWidth}, 200);
            }
        });
    };

    var closeHidePanel = function () {
        $hidePanel.slideUp(200, function () {
            $mpMusicWrap.removeClass('mp-mdl-shadow--2dp open');
        });
    };

    var playing = function (isPlaying) {
        if (isPlaying) $musicAlbum.addClass('playing');
        else $musicAlbum.removeClass('playing');
    };

    if (autoPlay === "yes") {
        setTimeout(function () {
            $play.trigger('click')
        }, 5000) //延迟加载
    }
})();