var customScroll;

//выпадающее меню пользователя
$(document).on('click', '.js-user', function () {
  $('.user').addClass('is-open');
  $('.header').addClass('user-open');
  document.addEventListener('click', closeUserDropdown);
  return false;
});

//функция закрытия выпадающего меню пользователя
function closeUserDropdown(evt) {
  if (!$('.user__dropdown').is(evt.target) && $('.user__dropdown').has(evt.target).length === 0) {
    $('.user').removeClass('is-open');
    $('.header').removeClass('user-open');
    document.removeEventListener('click', closeUserDropdown);
	}
}

//открытие сайдбара
$(document).on('click', '.js-sidebar-opener', function () {
  $('body').addClass('overflow');
  $('.sidebar').addClass('is-open');
  document.addEventListener('click', closeSideBar);
  document.addEventListener('keydown', onSideBarEscPress);
  return false;
});

//функция закрытия сайдбара
function closeSideBar(evt) {
  if (!$('.sidebar__inner').is(evt.target) && $('.sidebar__inner').has(evt.target).length === 0) {
    $('.sidebar').removeClass('is-open');
    $('body').removeClass('overflow');
    document.removeEventListener('click', closeSideBar);
    document.removeEventListener('keydown', onSideBarEscPress);
	}
}

// функция для обработчика нажатия Esc в открытом сайдбаре
var onSideBarEscPress = function (evt) {
  if (evt.keyCode === 27) {
    closeSideBar(evt);
  }
};

//случайный цвет из массива для блока пользователя
function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

var arr = ['color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'color_6'];

//открытие попапа
$(document).on('click', '.js-popup-opener', function () {
  $('body').addClass('overflow');
  $('.popup-wrapper').addClass('is-open');
  document.addEventListener('click', closePopup);
  document.addEventListener('keydown', onPopupEscPress);
  return false;
});

$(document).on('click', '.js-order-popup', function () {
  $('body').addClass('overflow');
  $('.popup-wrapper.order').addClass('is-open');
  document.addEventListener('click', closePopup);
  document.addEventListener('keydown', onPopupEscPress);
  return false;
});

//закрытие попапа
$(document).on('click', '.js-popup-close', function () {
  $('body').removeClass('overflow');
  $('.popup-wrapper').removeClass('is-open');
  document.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', onPopupEscPress);
  return false;
});

//функция закрытия попапа
function closePopup(evt) {
  if (!$('.popup').is(evt.target) && $('.popup').has(evt.target).length === 0) {
    $('.popup-wrapper').removeClass('is-open');
    $('body').removeClass('overflow');
    document.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onPopupEscPress);
	}
}

// функция для обработчика нажатия Esc в открытом сайдбаре
var onPopupEscPress = function (evt) {
  if (evt.keyCode === 27) {
    closePopup(evt);
  }
};

//проверка на пустоту поля ввода
$('.js-input').blur(function () {
  if($(this).val()) {
    $(this).parent('.input-label').addClass('filled');
  } else {
    $(this).parent('.input-label').removeClass('filled');
  }
});

//выпадающие списки автокомплита в инпутах номиналов
var pars = [
  "1000 руб.",
  "2000 руб.",
  "3000 руб.",
  "4000 руб.",
  "5000 руб.",
  "6000 руб."
];

$(".js-par").each(function () {
  $(this).autocomplete({
    source: pars,
    minLength: 0,
    open: function( event, ui ) {
      $(this).parent().addClass('focus');
      //инициализация кастомного скрола
      var menu = $(this).parent().find('.ui-menu')[0];
      if(!menu.classList.contains('ps')) {
        customScroll = new PerfectScrollbar(menu, {
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 20
        });
      } else {
        customScroll.update();
      }
    },
    close: function( event, ui ) {
      $(this).parent().removeClass('focus');
      customScroll.destroy();
    }
  })
  .focus(function() {
    $(this).autocomplete('search', '');
  });
});

//фикс для возможности перевыбора номинала в списке авокомплита
$(document).on('click', '.ui-menu-item-wrapper', function () {
  $('.js-par').blur();
  return false;
});

window.onload = function() {
  //случайный цвет из массива для блока пользователя
  var colorClass = arrayRandElement(arr);
  var userIcon = document.querySelector('.user__icon');
  userIcon.classList.add(colorClass);

  //проверка на пустоту поля ввода при загрузке страницы
  $('.js-input').each(function() {
    if($(this).val()) {
      $(this).parent('.input-label').addClass('filled');
    }
  });
}

//функция ресайза для textarea 54 - минимальная высота
autosize($('.textarea'));

//отмена заявки, показываем поле для комментов
$(document).on('click', '.js-show-comment', function () {
  $('.comments-block').slideDown();
  autosize.update($('.textarea'));
  return false;
});

//выбор рассылки "Отправить мне на email"
$(document).on('click', '.js-send-to-me', function () {
  $(this).addClass('is-open');
  $(this).find('.tile-button__hidden-block').slideDown();
  return false;
});
