$(function () {

  /* ---------------------------------------------------------
     Sticky nav shadow on scroll
  --------------------------------------------------------- */
  $(window).on('scroll', function () {
    $('#mainNav').toggleClass('scrolled', $(window).scrollTop() > 10);
  });

  function isDesktop() {
    return window.matchMedia('(min-width: 992px)').matches;
  }
  var closeTimer = null;
  $(document).on('mouseenter', '.has-dropdown', function () {
    if (!isDesktop()) return;
    clearTimeout(closeTimer);
    $('.has-dropdown').not(this).removeClass('open');
    $(this).addClass('open');
  });
  $(document).on('mouseleave', '.has-dropdown', function () {
    if (!isDesktop()) return;
    var $this = $(this);
    closeTimer = setTimeout(function () {
      $this.removeClass('open');
      $this.find('.flyout-submenu').removeClass('show');
    }, 200);
  });
  $(document).on('mouseenter', '.mega-dropdown, .simple-dropdown', function () {
    clearTimeout(closeTimer);
  });
  $(document).on('click', '.dropdown-trigger', function (e) {
    if (isDesktop()) return;
    e.preventDefault();
    e.stopPropagation();
    var $li = $(this).closest('.has-dropdown');
    var wasOpen = $li.hasClass('open');
    $('.has-dropdown').not($li).removeClass('open');
    $('.has-dropdown').not($li).find('.flyout-submenu').removeClass('show');

    $li.toggleClass('open', !wasOpen);
  });
  $(document).on('click', '.has-submenu', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $submenu = $(this).find('> .flyout-submenu');
    var isShown = $submenu.hasClass('show');

    $('.flyout-submenu').not($submenu).removeClass('show');
    $submenu.toggleClass('show', !isShown);
  });
  $(document).on('click', '.flyout-submenu', function (e) {
    e.stopPropagation();
  });

  /* ---------------------------------------------------------
     Click anywhere outside -> close all open dropdowns
  --------------------------------------------------------- */
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.has-dropdown').length) {
      $('.has-dropdown').removeClass('open');
      $('.flyout-submenu').removeClass('show');
    }
  });

  /* ---------------------------------------------------------
     Mobile sidebar: hamburger opens it, the panel's own X
     button or tapping the dark overlay closes it again.
  --------------------------------------------------------- */
  function openMobileMenu() {
    $('#navMenu').addClass('open');
    $('#navOverlay').addClass('show');
    $('body').css('overflow', 'hidden');
  }

  function closeMobileMenu() {
    $('#navMenu').removeClass('open');
    $('#navOverlay').removeClass('show');
    $('.has-dropdown').removeClass('open');
    $('.flyout-submenu').removeClass('show');
    $('body').css('overflow', '');
  }

  $(document).on('click', '#mobileToggle', function () {
    if ($('#navMenu').hasClass('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  $(document).on('click', '#mobileMenuClose', closeMobileMenu);
  $(document).on('click', '#navOverlay', closeMobileMenu);
  $(document).on('click', '.nav-menu > ul > li:not(.has-dropdown) > a', function () {
    if (!isDesktop()) closeMobileMenu();
  });

  var wasDesktop = isDesktop();
  $(window).on('resize', function () {
    var nowDesktop = isDesktop();
    if (nowDesktop !== wasDesktop) {
      wasDesktop = nowDesktop;
      $('.has-dropdown').removeClass('open');
      $('.flyout-submenu').removeClass('show');
      closeMobileMenu();
    }
  });

});

/* ---------------------------------------------------------
  Hero section start
 --------------------------------------------------------- */
$(function () {

  var $heroCarousel = $('#heroCarousel');
  if (!$heroCarousel.length) return;

  function revealSlide($slide) {
    var $items = $slide.find('.reveal-item');
    $items.removeClass('is-revealed');
    if ($slide.length) {
      void $slide[0].offsetWidth;
    }
    requestAnimationFrame(function () {
      $items.addClass('is-revealed');
    });
  }

  revealSlide($heroCarousel.find('.carousel-item.active'));

  $heroCarousel.on('slide.bs.carousel', function (e) {
    $(e.relatedTarget).find('.reveal-item').removeClass('is-revealed');
  });

  $heroCarousel.on('slid.bs.carousel', function (e) {
    revealSlide($(e.relatedTarget));
  });

});
/* ---------------------------------------------------------
   SIEC Highlights Number Counter Up Animation
   --------------------------------------------------------- */
$(document).ready(function () {
  var counters = $(".counter-num");
  var animated = false;

  function startCounter() {
    counters.each(function () {
      var $this = $(this);
      var target = parseInt($this.attr("data-target"));
      var suffix = $this.attr("data-suffix") || "+";

      $({
        countNum: 0
      }).animate({
        countNum: target
      }, {
        duration: 2000,
        easing: "swing",
        step: function () {
          $this.text(Math.floor(this.countNum) + suffix);
        },
        complete: function () {
          $this.text(this.countNum + suffix);
        }
      });
    });
    animated = true;
  }

  $(window).on("scroll.counter", function () {
    if (counters.length && !animated) {
      var topbarOffset = $(".siec-highlights").offset().top;
      var windowHeight = $(window).height();
      var scrollTop = $(window).scrollTop();

      if (scrollTop + windowHeight > topbarOffset + 100) {
        startCounter();
        $(window).off("scroll.counter");
      }
    }
  });
});

// floating icon javascript start
document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("scrollToTopBtn");
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
// floating icon javascript end

 // ==========================================
  //  siec course search start
  // ==========================================
document.addEventListener("DOMContentLoaded", function () {
  
 
  const tabs = document.querySelectorAll(".siec-tab");
  const panels = document.querySelectorAll(".siec-slider-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      const targetId = this.getAttribute("data-tab-target");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
        const track = targetPanel.querySelector(".siec-slider-track");
        if (track) track.scrollLeft = 0;
      }
    });
  });
  const sliderPanels = document.querySelectorAll(".siec-slider-panel");

  sliderPanels.forEach((panel) => {
    const prevBtn = panel.querySelector(".prev-btn");
    const nextBtn = panel.querySelector(".next-btn");
    const track = panel.querySelector(".siec-slider-track");

    if (track && prevBtn && nextBtn) {
      const getScrollAmount = () => {
        const cardWidth = panel.querySelector(".siec-card").offsetWidth;
        return cardWidth + 20;
      };

      nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      });

      prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
      });
      const toggleButtons = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft <= 5) {
          prevBtn.style.opacity = "0.3";
          prevBtn.style.pointerEvents = "none";
        } else {
          prevBtn.style.opacity = "1";
          prevBtn.style.pointerEvents = "auto";
        }
        if (track.scrollLeft >= maxScroll - 5) {
          nextBtn.style.opacity = "0.3";
          nextBtn.style.pointerEvents = "none";
        } else {
          nextBtn.style.opacity = "1";
          nextBtn.style.pointerEvents = "auto";
        }
      };
      track.addEventListener("scroll", toggleButtons);
      toggleButtons();
      window.addEventListener("resize", toggleButtons);
    }
  });
});
 // ==========================================
  //  siec course search end
  // ==========================================

  // ==========================================
  //  siec university list start
  // ==========================================
     document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".siec-uni-track");
  
  if (track) {
    track.addEventListener("mouseenter", () => {
      track.style.animationPlayState = "paused";
    });
    
    track.addEventListener("mouseleave", () => {
      track.style.animationPlayState = "running";
    });
  }
});

  // ==========================================
  //  siec university list end
  // ========================================== 

  // siec destination js start
document.addEventListener("DOMContentLoaded", () => {
  const destTrack = document.querySelector(".dest-slider-moving-track");
  if (!destTrack) return;

  const destCards = Array.from(destTrack.children);
  destCards.forEach(card => {
    const clone = card.cloneNode(true);
    destTrack.appendChild(clone);
  });

  let destSpeed = 1;
  let destScrollAmount = 0;
  let destIsPaused = false;

  function runDestSlider() {
    if (!destIsPaused) {
      destScrollAmount += destSpeed;
      if (destScrollAmount >= destTrack.scrollWidth / 2) {
        destScrollAmount = 0;
      }
      destTrack.style.transform = `translateX(-${destScrollAmount}px)`;
    }
    requestAnimationFrame(runDestSlider);
  }

  destTrack.addEventListener("mouseenter", () => destIsPaused = true);
  destTrack.addEventListener("mouseleave", () => destIsPaused = false);

  requestAnimationFrame(runDestSlider);
});

  //siec destination js end