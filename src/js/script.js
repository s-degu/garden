
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  var topBtn = $('.js-page-top');
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  });

  //ドロワーメニュー
  $("#MenuButton").click(function () {
    // $(".l-drawer-menu").toggleClass("is-show");
    // $(".p-drawer-menu").toggleClass("is-show");
    $(".js-drawer-open").toggleClass("open");
    $(".drawer-menu").toggleClass("open");
    $("html").toggleClass("is-fixed");
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)
  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    // let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    // let targetY = target.offset().top - header;
    let targetY = target.offset().top;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });

  //モーダル
  var $body = $('body'); //変数の設定
  var scrollTop; //スクロール量を保存
  
  //スクロールを固定
  function bodyFixedOn() {
    scrollTop = $(window).scrollTop();
    
    $body.css({
      position: 'fixed',
      top: -scrollTop
    });
  }
  
  //スクロールの固定を解除
  function bodyFixedOff() {
    $body.css({
      position: '',
      top: ''
    });
    
    $(window).scrollTop(scrollTop);
  }
  
  //モーダルのトリガーをクリックしたとき
  $('.js-modal-open').on('click', function() {
    bodyFixedOn();
  });
  
  $('.js-modal-open').on('click',function(){
    $('.js-modal').fadeIn();
    return false;
  });
  
  //モーダルのオーバーレイをクリックしたとき
  $('.js-modal-close').on('click', function() {
    bodyFixedOff();
  });
  
  $('.js-modal-close').on('click',function(){
    $('.js-modal').fadeOut();
    return false;
  });
});

//google map api
window.initMap = () => {

  let map;

  const area = document.getElementById("map"); // マップを表示させるHTMLの箱
// マップの中心位置(例:原宿駅)
  const center = {
    lat: 34.7024854,
    lng: 135.4937619
  };

  const styles = [
    //地図全体の色味をカスタマイズ
    //グレースケールにするために、saturation(彩度)を最低値-100に設定
    {
      stylers: [{
        saturation: -100
      }]
    }
  ];

  //マップ作成
  map = new google.maps.Map(area, {
    center,
    zoom: 17,
    styles: styles
  });

  //マーカーオプション設定
  const markerOption = {
    position: center, // マーカーを立てる位置を指定
    map: map, // マーカーを立てる地図を指定
    icon: {
      url: '../../assets/images/google_map_pin.png'// お好みの画像までのパスを指定
    }
  }

  //マーカー作成
  const marker = new google.maps.Marker(markerOption);
}