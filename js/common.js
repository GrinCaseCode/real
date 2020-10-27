(function($){

  /* Для проверки resize, т.к. на мобильном Хроме при скролле срабывает resize (без изменения ширины) */
  var screenWidth = $(window).width();

  /* Инициализация wow */
  wow = new WOW({mobile: false})
  wow.init();

  /* Инициализация красивых select'ов */
  $('select').niceSelect();

  /* Нужно для IE и некоторых других браузеров, чтобы понимал svg спрайты во внешних файлах */
  svg4everybody();

  /* полифил для object-fit */
  objectFitImages($('[data-object-fit-cover],[data-object-fit-cover-top],[data-object-fit-contain]'), {watchMQ: true});

  /* инициализация fancybox */
  $(".fancybox").fancybox({
    padding: 0,
    scrolling: 'auto'
  });

  /* Плавный скролл к якорю для всех ссылок с классом "inner-link" */
  $(function(){
    $('.inner-link[href^="#"]').click(function(){
      var _href = $(this).attr('href');
      $('html, body').animate({scrollTop: $(_href).offset().top - 20 +'px'});
      return false;
    });
  });

  /* Плавный скролл "вверх" */
  $('a[href^="#page_wr"]').click(function(event){
    event.preventDefault;
    var _href = $(this).attr('href');
    $('html, body').animate({scrollTop: '0px'});
    return false;
  });

  $('.burger').click(function() {
    $('.header__bottom').toggleClass('active');
  });

  /* Открытие / закрытие модалок (кроме карты) */
  $('a.open-modal').click(function(event){
    event.preventDefault();
    var _href = $(this).attr('href');
    if ( $(_href).length > 0 ) {
      $(_href).addClass('active');
      $(_href + ' .modal__content').addClass('visible');
    }
  });

  function closeModal() {
    var activeCount = $('.modal.active').length;
    if ( activeCount > 1 ) {
      $($('.modal.active')[activeCount - 1]).removeClass('active');
      $('.modal__callback2 .modal__content').removeClass('visible');
    } else {
      $('.modal').removeClass('active');
      $('.modal__content').removeClass('visible');
    }
  }

  $(document).mouseup(function (e) {
    var container = $(".modal .modal__content");
    if (container.has(e.target).length === 0){
      closeModal();
    }
  });

  $('.modal .close').click(function(){
    closeModal();
  });

  $(document).keydown(function(eventObject){
    if( eventObject.which == 27 ){
      closeModal();
    }
  });

  // маска поля tel
  $(".wpcf7-tel").mask("+7 (999) 999-99-99");

  // Секции по типу "Вопрос - ответ"
  function toggleHidden(xParent,hideOther) {
    $(xParent + ' .top').click(function() {
      $(this).find('.open').toggleClass('active');
      $(this).siblings().slideToggle();
      if (hideOther) {
        $(this).parent().siblings().find('.open').removeClass('active');
        $(this).parent().siblings().find('.hidden').slideUp();
      }
    });
  }

  toggleHidden('.faq',true);

  $('.faq__item:first-of-type .hidden').show();
  $('.faq__item:first-of-type .open').addClass('active');

  // фиксированные шапка
  $(window).on("scroll", function() {
    var fromTop = $(document).scrollTop();
    $(".header").toggleClass("fixed", (fromTop > 10));
    $(".to-top").toggleClass("fixed", (fromTop > 600));
  });

  // Табы
  $('.serv__nav > li > a').click(function(event) {
    event.preventDefault();
    var _href = $(this).attr('href');
    $(this).parent().siblings().removeClass('current');
    $(this).parent().addClass('current');
    $('.serv__tab').not(_href).hide();
    $(_href).fadeIn();
    if (window.matchMedia('(max-width: 767px)').matches) {
      $('html, body').animate({scrollTop: $(_href).offset().top - 70 +'px'});
    }
  });

  $('.tabs li a').click(function(event) {
    event.preventDefault();
    $(this).parent().parent().find("li").removeClass('active');
    $(this).parent().addClass('active');
    $(this).parent().parent().siblings(".tab-container").find(".tab-pane").hide();
    var selectTab = $(this).attr("href");
    $(selectTab).fadeIn();
  });

  $('img').on('dragstart', function (event) {
    event.preventDefault();
  });

  if (window.matchMedia('(max-width: 991px)').matches) {
    $('.header__bottom .burger').addClass('active');
  }


  /* СЛАЙДЕРЫ */

  var teamSlider = new Swiper('#team__slider', {
    slidesPerView: 1,
    spaceBetween: 15,
    watchSlidesProgress: true,
    watchOverflow: true,
    navigation: {
      nextEl: '.team__wrap .swiper-button-next',
      prevEl: '.team__wrap .swiper-button-prev',
    },
    pagination: {
      el: '.team__wrap .swiper-dots',
    },
    breakpoints: {
      991: {
        slidesPerView: 4,
        slidesPerColumn: 3,
        slidesPerColumnFill: 'row',
        spaceBetween: 34,
      },
      767: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
      },
      650: {
        slidesPerView: 3,
      },
      400: {
        slidesPerView: 2,
      },
    },
  });

  $('.certs__slider').each(function(){
        var swiper = new Swiper(this, {
         slidesPerView: 2,
    spaceBetween: 20,
    watchSlidesProgress: true,
    loop: true,
    watchOverflow: true,
    navigation: {
      nextEl: $(this).parent().find('.certs__btns').find(".swiper-button-next"),
      prevEl:  $(this).parent().find('.certs__btns').find(".swiper-button-prev"),
    },
    pagination: {
      el: $(this).parent().find('.certs__btns').find(".swiper-dots"),
    },
    breakpoints: {
      900: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      650: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
            
    });
});

    $('.slider-team').each(function(){
        var swiper = new Swiper(this, {
         slidesPerView: 2,
    spaceBetween: 20,
    watchSlidesProgress: true,
    loop: true,
    watchOverflow: true,
    navigation: {
      nextEl: $(this).parent().find('.certs__btns').find(".swiper-button-next"),
      prevEl:  $(this).parent().find('.certs__btns').find(".swiper-button-prev"),
    },
    pagination: {
      el: $(this).parent().find('.certs__btns').find(".swiper-dots"),
    },
    breakpoints: {
      900: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      650: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
            
    });
});


})(jQuery);
