// Adds tabbing class on Tab key, removes it on mouse click to track keyboard navigation
const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    $('body').addClass('user-is-tabbing');
    $(window).off('keydown', handleFirstTab);
    $(window).on('mousedown', handleMouseDownOnce);
  }
}

// Removes tabbing class on mouse click and re-listens for Tab key
const handleMouseDownOnce = () => {
  $('body').removeClass('user-is-tabbing');
  $(window).off('mousedown', handleMouseDownOnce);
  $(window).on('keydown', handleFirstTab);
}

$(window).on('keydown', handleFirstTab);

// Toggles back-to-top button visibility based on scroll position
const $backToTopButton = $('.back-to-top');
let isBackToTopRendered = false;

// Closes mobile menu when X button is clicked
$('#mobileMenuCloseBtn').on('click', function() {
  $('#mobileMenu').removeClass('open');
});

// Updates back-to-top button styles based on render state
let alterStyles = (isBackToTopRendered) => {
  $backToTopButton.css({
    visibility: isBackToTopRendered ? 'visible' : 'hidden',
    opacity: isBackToTopRendered ? 1 : 0,
    transform: isBackToTopRendered ? 'scale(1)' : 'scale(0)'
  });
};

// Shows or hides back-to-top button after scrolling 700px
$(window).on('scroll', () => {
  isBackToTopRendered = $(window).scrollTop() > 700;
  alterStyles(isBackToTopRendered);
});

let isLightMode = false;

const lightImage = './images/morning-picture.png';
const darkImage = './images/evening-picture.png';
const darkHoverImage = './images/sleeping-picture.png';

// Header background images
const headerDark = './images/header.jpg';
const headerLight = './images/header1.png';

// Switches between light and dark mode, updating body class, button text, header, and about photo
function switchMode() {
  if (isLightMode) {
    // Switch to dark mode
    $('body').removeClass('light-mode');
    isLightMode = false;
    $('#mobileModeBtn').text('Light Mode');
    $('.header').css('background-image', `linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.4)), url('${headerDark}')`);
    $('#aboutPhoto').css('opacity', 0);
    setTimeout(function() {
      $('#aboutPhoto').attr('src', darkImage).css('opacity', 1);
    }, 200);
  } else {
    // Switch to light mode
    $('body').addClass('light-mode');
    isLightMode = true;
    $('#mobileModeBtn').text('Dark Mode');
    $('.header').css('background-image', `linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.4)), url('${headerLight}')`);
    $('#aboutPhoto').css('opacity', 0);
    setTimeout(function() {
      $('#aboutPhoto').attr('src', lightImage).css('opacity', 1);
    }, 200);
  }
}

// Triggers switchMode on desktop toggle click
$('#toggleSwitch').on('click', function() {
  switchMode();
});

// Triggers switchMode on mobile button click
$('#mobileModeBtn').on('click', function() {
  switchMode();
});

// Swaps about photo to hover image on mouse enter in dark mode
$('#aboutPhoto').on('mouseenter', function() {
  if (!isLightMode) $(this).attr('src', darkHoverImage);
});

// Reverts about photo to dark image on mouse leave in dark mode
$('#aboutPhoto').on('mouseleave', function() {
  if (!isLightMode) $(this).attr('src', darkImage);
});

// Toggles mobile menu open/close on burger button click
$('#burgerBtn').on('click', function() {
  $('#mobileMenu').toggleClass('open');
});

// Closes mobile menu when a nav link is clicked
$('.nav__mobile-link').on('click', function() {
  $('#mobileMenu').removeClass('open');
});