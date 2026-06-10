$(function () {

  /* ============================================================
     NAVBAR – scroll shadow & hamburger
  ============================================================ */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 30) {
      $('nav').addClass('scrolled');
    } else {
      $('nav').removeClass('scrolled');
    }
  });

  $('.hamburger').on('click', function () {
    $('.nav-links').toggleClass('open');
    $(this).toggleClass('active');
  });

  // Close menu on nav link click (mobile)
  $('.nav-links a').on('click', function () {
    $('.nav-links').removeClass('open');
    $('.hamburger').removeClass('active');
  });

  /* ============================================================
     SMOOTH SCROLL
  ============================================================ */
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 70 }, 600, 'swing');
    }
  });

  /* ============================================================
     TYPING ANIMATION
  ============================================================ */
  const words = ['website development', 'website design', 'SEO', 'UI/UX design', 'mobile optimization', 'website migration'];
  let wordIndex = 0;
  let charIndex  = 0;
  let isDeleting = false;
  const el       = document.getElementById('typed-word');
  const SPEED_TYPE  = 80;
  const SPEED_DEL   = 45;
  const PAUSE_AFTER = 1800;

  function type () {
    const current = words[wordIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? SPEED_DEL : SPEED_TYPE;

    if (!isDeleting && charIndex === current.length) {
      delay = PAUSE_AFTER;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
      delay = 300;
    }
    setTimeout(type, delay);
  }
  if (el) type();

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */
  function checkReveal () {
    const windowBottom = $(window).scrollTop() + $(window).height();
    $('.reveal').each(function () {
      if ($(this).offset().top < windowBottom - 60) {
        $(this).addClass('visible');
      }
    });
  }
  $(window).on('scroll', checkReveal);
  checkReveal(); // run on load for items already in view

  /* ============================================================
     VIDEO MODAL
  ============================================================ */
  // Convert youtube watch URL → embed URL
  function toEmbedUrl (url) {
    // Handles ?v= format
    const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (match) return 'https://www.youtube.com/embed/' + match[1] + '?autoplay=1&rel=0';
    return url;
  }

  $(document).on('click', '.project-card', function () {
    const videoUrl = $(this).data('video');
    if (!videoUrl) return;
    const embed = toEmbedUrl(videoUrl);
    $('#modal-iframe').attr('src', embed);
    $('#video-modal').addClass('active');
    $('body').css('overflow', 'hidden');
  });

  function closeModal () {
    $('#video-modal').removeClass('active');
    $('#modal-iframe').attr('src', '');
    $('body').css('overflow', '');
  }

  $('#modal-close').on('click', closeModal);
  $('#video-modal').on('click', function (e) {
    if ($(e.target).is('#video-modal')) closeModal();
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

});
