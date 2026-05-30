// Markdown Ipsum — copy-to-clipboard + flavour navigation (history API + localStorage).
(function () {
  "use strict";

  var STORAGE_KEY = "md-ipsum-flavour";
  var main = document.querySelector("main");
  var toast = document.getElementById("copied");
  var toastTimer;

  // --- Copy to clipboard ---------------------------------------------------
  function showToast() {
    if (!toast) return;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1000);
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(showToast, function () {});
    }
    var area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      showToast();
    } catch (e) {
      /* no-op */
    }
    document.body.removeChild(area);
  }

  function bindCopy() {
    if (!main) return;
    main.querySelectorAll("legend[data-copy]").forEach(function (legend) {
      function go() {
        var target = document.getElementById(legend.getAttribute("data-copy"));
        if (target) copy(target.value);
      }
      legend.addEventListener("click", go);
      legend.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          go();
        }
      });
    });
  }

  // --- Flavour navigation (no full reload) ---------------------------------
  var links = Array.prototype.slice.call(
    document.querySelectorAll(".site-nav__flavours a")
  );

  function remember(flavour) {
    try {
      localStorage.setItem(STORAGE_KEY, flavour);
    } catch (e) {
      /* storage unavailable */
    }
  }

  function preferred() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setActive(flavour) {
    links.forEach(function (a) {
      var on = a.getAttribute("data-flavour") === flavour;
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function currentFlavour() {
    var active = document.querySelector(".site-nav__flavours a[aria-current]");
    return active ? active.getAttribute("data-flavour") : "commonmark";
  }

  function load(url, flavour, push) {
    return fetch(url)
      .then(function (res) {
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var fresh = doc.querySelector("main");
        if (main && fresh) main.innerHTML = fresh.innerHTML;
        if (doc.title) document.title = doc.title;
        setActive(flavour);
        bindCopy();
        if (push) history.pushState({ flavour: flavour }, "", url);
        remember(flavour);
        window.scrollTo(0, 0);
      })
      .catch(function () {
        // Network failure: fall back to a normal navigation.
        window.location.href = url;
      });
  }

  links.forEach(function (a) {
    a.addEventListener("click", function (event) {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      event.preventDefault();
      load(a.getAttribute("href"), a.getAttribute("data-flavour"), true);
    });
  });

  window.addEventListener("popstate", function (event) {
    var flavour = (event.state && event.state.flavour) || "commonmark";
    var link = links.filter(function (a) {
      return a.getAttribute("data-flavour") === flavour;
    })[0];
    if (link) load(link.getAttribute("href"), flavour, false);
  });

  // --- Init ----------------------------------------------------------------
  bindCopy();

  var current = currentFlavour();
  var saved = preferred();

  // On the landing page (CommonMark), honour a saved preference for another flavour.
  if (current === "commonmark" && saved && saved !== "commonmark") {
    var link = links.filter(function (a) {
      return a.getAttribute("data-flavour") === saved;
    })[0];
    if (link) load(link.getAttribute("href"), saved, true);
    else remember(current);
  } else {
    remember(current);
  }
})();
