$(document).ready(function() {
    var el = $('.category-owl');
    
    var carousel;
    var carouselOptions = {
      margin: 88,
      nav:false,
      dots:false,
      slideBy: 'page',
      responsive: {
        0: {
          margin:37,
          items: 3,
          rows: 2 //custom option not used by Owl Carousel, but used by the algorithm below
        },
        768: {
          margin:37,
          items: 3,
          rows: 2 //custom option not used by Owl Carousel, but used by the algorithm below
        },
        991: {
          items: 6,
          rows: 1 //custom option not used by Owl Carousel, but used by the algorithm below
        }
      }
    };
  
    //Taken from Owl Carousel so we calculate width the same way
    var viewport = function() {
      var width;
      if (carouselOptions.responsiveBaseElement && carouselOptions.responsiveBaseElement !== window) {
        width = $(carouselOptions.responsiveBaseElement).width();
      } else if (window.innerWidth) {
        width = window.innerWidth;
      } else if (document.documentElement && document.documentElement.clientWidth) {
        width = document.documentElement.clientWidth;
      } else {
        console.warn('Can not detect viewport width.');
      }
      return width;
    };
  
    var severalRows = false;
    var orderedBreakpoints = [];
    for (var breakpoint in carouselOptions.responsive) {
      if (carouselOptions.responsive[breakpoint].rows > 1) {
        severalRows = true;
      }
      orderedBreakpoints.push(parseInt(breakpoint));
    }
    
    //Custom logic is active if carousel is set up to have more than one row for some given window width
    if (severalRows) {
      orderedBreakpoints.sort(function (a, b) {
        return b - a;
      });
      var slides = el.find('[data-slide-index]');
      var slidesNb = slides.length;
      if (slidesNb > 0) {
        var rowsNb;
        var previousRowsNb = undefined;
        var colsNb;
        var previousColsNb = undefined;
  
        //Calculates number of rows and cols based on current window width
        var updateRowsColsNb = function () {
          var width =  viewport();
          for (var i = 0; i < orderedBreakpoints.length; i++) {
            var breakpoint = orderedBreakpoints[i];
            if (width >= breakpoint || i == (orderedBreakpoints.length - 1)) {
              var breakpointSettings = carouselOptions.responsive['' + breakpoint];
              rowsNb = breakpointSettings.rows;
              colsNb = breakpointSettings.items;
              break;
            }
          }
        };
  
        var updateCarousel = function () {
          updateRowsColsNb();
  
          //Carousel is recalculated if and only if a change in number of columns/rows is requested
          if (rowsNb != previousRowsNb || colsNb != previousColsNb) {
            var reInit = false;
            if (carousel) {
              //Destroy existing carousel if any, and set html markup back to its initial state
              carousel.trigger('destroy.owl.carousel');
              carousel = undefined;
              slides = el.find('[data-slide-index]').detach().appendTo(el);
              el.find('.fake-col-wrapper').remove();
              reInit = true;
            }
  
  
            //This is the only real 'smart' part of the algorithm
  
            //First calculate the number of needed columns for the whole carousel
            var perPage = rowsNb * colsNb;
            var pageIndex = Math.floor(slidesNb / perPage);
            var fakeColsNb = pageIndex * colsNb + (slidesNb >= (pageIndex * perPage + colsNb) ? colsNb : (slidesNb % colsNb));
  
            //Then populate with needed html markup
            var count = 0;
            for (var i = 0; i < fakeColsNb; i++) {
              //For each column, create a new wrapper div
              var fakeCol = $('<div class="fake-col-wrapper"></div>').appendTo(el);
              for (var j = 0; j < rowsNb; j++) {
                //For each row in said column, calculate which slide should be present
                var index = Math.floor(count / perPage) * perPage + (i % colsNb) + j * colsNb;
                if (index < slidesNb) {
                  //If said slide exists, move it under wrapper div
                  slides.filter('[data-slide-index=' + index + ']').detach().appendTo(fakeCol);
                }
                count++;
              }
            }
            //end of 'smart' part
  
            previousRowsNb = rowsNb;
            previousColsNb = colsNb;
  
            if (reInit) {
              //re-init carousel with new markup
              carousel = el.owlCarousel(carouselOptions);
            }
          }
        };
  
        //Trigger possible update when window size changes
        $(window).on('resize', updateCarousel);
  
        //We need to execute the algorithm once before first init in any case
        updateCarousel();
      }
    }
  
    //init
    carousel = el.owlCarousel(carouselOptions);
  });




  $(document).ready(function() {
    var el = $('.product-owl');
    
    var carousel;
    var carouselOptions = {
      margin: 68,
      nav:false,
      dots:false,
      slideBy: 'page',
      responsive: {
        0: {
          items: 2,
          rows: 2,
          margin:34 //custom option not used by Owl Carousel, but used by the algorithm below
        },
        768: {
          items: 2,
          rows: 2,
          margin:34  //custom option not used by Owl Carousel, but used by the algorithm below
        },
        991: {
          items: 5,
          rows: 1 //custom option not used by Owl Carousel, but used by the algorithm below
        }
      }
    };
  
    //Taken from Owl Carousel so we calculate width the same way
    var viewport = function() {
      var width;
      if (carouselOptions.responsiveBaseElement && carouselOptions.responsiveBaseElement !== window) {
        width = $(carouselOptions.responsiveBaseElement).width();
      } else if (window.innerWidth) {
        width = window.innerWidth;
      } else if (document.documentElement && document.documentElement.clientWidth) {
        width = document.documentElement.clientWidth;
      } else {
        console.warn('Can not detect viewport width.');
      }
      return width;
    };
  
    var severalRows = false;
    var orderedBreakpoints = [];
    for (var breakpoint in carouselOptions.responsive) {
      if (carouselOptions.responsive[breakpoint].rows > 1) {
        severalRows = true;
      }
      orderedBreakpoints.push(parseInt(breakpoint));
    }
    
    //Custom logic is active if carousel is set up to have more than one row for some given window width
    if (severalRows) {
      orderedBreakpoints.sort(function (a, b) {
        return b - a;
      });
      var slides = el.find('[data-slide-index]');
      var slidesNb = slides.length;
      if (slidesNb > 0) {
        var rowsNb;
        var previousRowsNb = undefined;
        var colsNb;
        var previousColsNb = undefined;
  
        //Calculates number of rows and cols based on current window width
        var updateRowsColsNb = function () {
          var width =  viewport();
          for (var i = 0; i < orderedBreakpoints.length; i++) {
            var breakpoint = orderedBreakpoints[i];
            if (width >= breakpoint || i == (orderedBreakpoints.length - 1)) {
              var breakpointSettings = carouselOptions.responsive['' + breakpoint];
              rowsNb = breakpointSettings.rows;
              colsNb = breakpointSettings.items;
              break;
            }
          }
        };
  
        var updateCarousel = function () {
          updateRowsColsNb();
  
          //Carousel is recalculated if and only if a change in number of columns/rows is requested
          if (rowsNb != previousRowsNb || colsNb != previousColsNb) {
            var reInit = false;
            if (carousel) {
              //Destroy existing carousel if any, and set html markup back to its initial state
              carousel.trigger('destroy.owl.carousel');
              carousel = undefined;
              slides = el.find('[data-slide-index]').detach().appendTo(el);
              el.find('.fake-col-wrapper').remove();
              reInit = true;
            }
  
  
            //This is the only real 'smart' part of the algorithm
  
            //First calculate the number of needed columns for the whole carousel
            var perPage = rowsNb * colsNb;
            var pageIndex = Math.floor(slidesNb / perPage);
            var fakeColsNb = pageIndex * colsNb + (slidesNb >= (pageIndex * perPage + colsNb) ? colsNb : (slidesNb % colsNb));
  
            //Then populate with needed html markup
            var count = 0;
            for (var i = 0; i < fakeColsNb; i++) {
              //For each column, create a new wrapper div
              var fakeCol = $('<div class="fake-col-wrapper"></div>').appendTo(el);
              for (var j = 0; j < rowsNb; j++) {
                //For each row in said column, calculate which slide should be present
                var index = Math.floor(count / perPage) * perPage + (i % colsNb) + j * colsNb;
                if (index < slidesNb) {
                  //If said slide exists, move it under wrapper div
                  slides.filter('[data-slide-index=' + index + ']').detach().appendTo(fakeCol);
                }
                count++;
              }
            }
            //end of 'smart' part
  
            previousRowsNb = rowsNb;
            previousColsNb = colsNb;
  
            if (reInit) {
              //re-init carousel with new markup
              carousel = el.owlCarousel(carouselOptions);
            }
          }
        };
  
        //Trigger possible update when window size changes
        $(window).on('resize', updateCarousel);
  
        //We need to execute the algorithm once before first init in any case
        updateCarousel();
      }
    }
  
    //init
    carousel = el.owlCarousel(carouselOptions);
  });




  //prodcut number counter
	$(document).ready(function() {
    $('.product-minus').click(function () {
      var $input = $('.number-input');
      var count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      return false;
    });
    $('.product-plus').click(function () {
      var $input = $('.number-input');
      $input.val(parseInt($input.val()) + 1);
      $input.change();
      return false;
    });
});


//homepage to searchbar 
$(document).ready(function(e){
  $('.search-panel .dropdown-menu').find('a').click(function(e) {
  e.preventDefault();
  var param = $(this).attr("href").replace("#","");
  var concept = $(this).text();
  $('.search-panel span#search_concept').text(concept);
  $('.input-group #search_param').val(param);
   });
   console.log('working')
  });



//product number count 


$('.pm-btn-number').click(function(e){
  e.preventDefault();
  
  fieldName = $(this).attr('data-field');
  type      = $(this).attr('data-type');
  var input = $("input[name='"+fieldName+"']");
  var currentVal = parseInt(input.val());
  if (!isNaN(currentVal)) {
      if(type == 'minus') {
          
          if(currentVal > input.attr('min')) {
              input.val(currentVal - 1).change();
          } 
          if(parseInt(input.val()) == input.attr('min')) {
              $(this).attr('disabled', true);
          }

      } else if(type == 'plus') {

          if(currentVal < input.attr('max')) {
              input.val(currentVal + 1).change();
          }
          if(parseInt(input.val()) == input.attr('max')) {
              $(this).attr('disabled', true);
          }

      }
  } else {
      input.val(0);
  }
});
$('.input-number').focusin(function(){
 $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
  
  minValue =  parseInt($(this).attr('min'));
  maxValue =  parseInt($(this).attr('max'));
  valueCurrent = parseInt($(this).val());
  
  name = $(this).attr('name');
  if(valueCurrent >= minValue) {
      $(".pm-btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
  } else {
      alert('Sorry, the minimum value was reached');
      $(this).val($(this).data('oldValue'));
  }
  if(valueCurrent <= maxValue) {
      $(".pm-btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
  } else {
      alert('Sorry, the maximum value was reached');
      $(this).val($(this).data('oldValue'));
  }
});


  
  
  
//mini cart on click function 

const bagCartShow = document.getElementById('bagCartShow');
const miniLargeCart = document.getElementsByClassName('mini-large-cart');

bagCartShow.addEventListener('click', showMiniCart);

function showMiniCart(){
  console.log('clcik');
  miniLargeCart[0].classList.toggle('d-block');
}
  
$(".button-close-xs").click(function(){
  $('.mini-large-cart').removeClass('d-block');
  $('.mini-large-cart').css("display", "none");
  console.log('i am working')
}); 


//sticky nav init

// $(document).ready(function(){
//   $("#top-navbar-area").sticky({topSpacing:0});
//   $('#main-nav-area').sticky({topSpacing:100});
// });


//model login signup 
const supNext = document.getElementById('sup-next');
const veriNext = document.getElementById('veri-next');
const mOtpMesasge = document.getElementById('mOtpMesasge');
const otpArea = document.getElementById('otpArea');
const lsNamePhone = document.getElementById('lsNamePhone');
const mPasswordArea = document.getElementById('mPasswordArea');
const pConfirm = document.getElementById('p-confirm');


supNext.addEventListener('click', ()=>{
  lsNamePhone.style.display = 'none';
  mOtpMesasge.style.display = 'block';
  otpArea.style.display = 'block';
  veriNext.style.display = "block";
  supNext.style.display = "none";
})

veriNext.addEventListener('click', ()=>{
  otpArea.style.display = 'none';
  mOtpMesasge.style.display = 'none';
  veriNext.style.display = "none";
  mPasswordArea.style.display = "block";
  pConfirm.style.display = "block";
});