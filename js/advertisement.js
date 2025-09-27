$(document).ready(function() {
    const galleryMain = new Swiper('#gallery-main', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'hero-block__dot',
            bulletActiveClass: 'hero-block__dot--active',
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            }
        }
    });

    let similarAdsSwiper = null;
    
    function initSimilarAdsSwiper() {
        if ($(window).width() <= 768 && !similarAdsSwiper) {
            const $grid = $('#similar-ads-grid');
            const $items = $grid.find('.section-new__item');
            
            $grid.addClass('swiper').html('<div class="swiper-wrapper"></div>');
            const $wrapper = $grid.find('.swiper-wrapper');
            
            for (let i = 0; i < $items.length; i += 2) {
                const $slide = $('<div class="swiper-slide similar-ads__slide"></div>');
                
                if ($items.eq(i).length) {
                    $slide.append($items.eq(i).clone());
                }
                
                if ($items.eq(i + 1).length) {
                    $slide.append($items.eq(i + 1).clone());
                }
                
                $wrapper.append($slide);
            }
            
            similarAdsSwiper = new Swiper('#similar-ads-grid', {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    el: '.similar-ads__pagination',
                    clickable: true,
                    bulletClass: 'hero-block__dot',
                    bulletActiveClass: 'hero-block__dot--active',
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '"></span>';
                    }
                }
            });
        } else if ($(window).width() > 768 && similarAdsSwiper) {
            similarAdsSwiper.destroy(true, true);
            similarAdsSwiper = null;
            
            const $grid = $('#similar-ads-grid');
            $grid.removeClass('swiper');
            
            const $slides = $grid.find('.swiper-slide');
            $grid.empty();
            
            $slides.each(function() {
                $(this).find('.section-new__item').each(function() {
                    $grid.append($(this));
                });
            });
        }
    }
    
    initSimilarAdsSwiper();
    $(window).on('resize', initSimilarAdsSwiper);

    function openReplyPopup() {
        $('#reply-popup').addClass('active');
        $('body').css('overflow', 'hidden');
    }

    function closeReplyPopup() {
        $('#reply-popup').removeClass('active');
        $('body').css('overflow', '');
        $('#reply-form')[0].reset();
    }

    $('.hero-block__btn-write').on('click', function(e) {
        e.preventDefault();
        openReplyPopup();
    });

    $('#popup-close-btn, #popup-cancel-btn').on('click', closeReplyPopup);

    $('#reply-popup').on('click', function(e) {
        if (e.target === this) {
            closeReplyPopup();
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#reply-popup').hasClass('active')) {
            closeReplyPopup();
        }
    });

});