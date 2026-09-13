/* SERENDIB — Sri Lanka Tourism */

(function () {
  'use strict';

  /* ---------- Preloader ---------- */
  var pre = document.getElementById('preloader');
  if (pre) {
    window.addEventListener('load', function () {
      setTimeout(function () { pre.classList.add('hidden'); }, 600);
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function addReveal() {
    document.querySelectorAll('.card, .exp-item, .tradition-card, .stat, .site-card, .timeline-item, .contact-item')
      .forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4) * 0.08 + 's';
      });
  }
  addReveal();

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Count-up stats ---------- */
  var statNums = document.querySelectorAll('.stat-num');
  var counted = false;
  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNums.forEach(function (el) {
          var target = parseInt(el.getAttribute('data-target'), 10);
          var duration = 1500;
          var start = null;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            el.textContent = Math.floor(p * target).toLocaleString();
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
        statObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  if (statNums.length) statObserver.observe(statNums[0]);

  /* ---------- Generic success form handler ---------- */
  function initSuccessForm(formId, successId, closeId) {
    var form = document.getElementById(formId);
    var success = document.getElementById(successId);
    var close = document.getElementById(closeId);
    if (!form || !success || !close) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('hide');
      success.classList.add('show');
    });
    close.addEventListener('click', function () {
      form.reset();
      success.classList.remove('show');
      form.classList.remove('hide');
    });
  }

  initSuccessForm('planForm', 'planSuccess', 'successClose');
  initSuccessForm('contactForm', 'contactSuccess', 'contactClose');

})();
