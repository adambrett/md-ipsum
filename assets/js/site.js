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

  // --- Burger menu (small screens) -----------------------------------------
  var burger = document.querySelector(".site-nav__burger");
  var flavoursList = document.getElementById("site-flavours");

  function closeMenu() {
    if (!flavoursList) return;
    flavoursList.classList.remove("is-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }

  if (burger && flavoursList) {
    burger.addEventListener("click", function () {
      var open = flavoursList.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", function (event) {
      if (!flavoursList.contains(event.target) && !burger.contains(event.target)) {
        closeMenu();
      }
    });
  }

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

  function linkFor(flavour) {
    return links.filter(function (a) {
      return a.getAttribute("data-flavour") === flavour;
    })[0];
  }

  function setActive(flavour) {
    links.forEach(function (a) {
      if (a.getAttribute("data-flavour") === flavour) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function currentFlavour() {
    var active = document.querySelector(".site-nav__flavours a[aria-current]");
    return active ? active.getAttribute("data-flavour") : "commonmark";
  }

  // mode: "push" | "replace" | "" (no history change)
  function load(url, flavour, mode) {
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
        if (mode === "push") history.pushState({ flavour: flavour }, "", url);
        else if (mode === "replace") history.replaceState({ flavour: flavour }, "", url);
        remember(flavour);
        window.scrollTo(0, 0);
      })
      .catch(function () {
        window.location.href = url; // network failure: normal navigation
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
      closeMenu();
      load(a.getAttribute("href"), a.getAttribute("data-flavour"), "push");
    });
  });

  window.addEventListener("popstate", function (event) {
    var flavour = (event.state && event.state.flavour) || currentFlavour();
    var link = linkFor(flavour);
    if (link) load(link.getAttribute("href"), flavour, "");
  });

  // --- Init ----------------------------------------------------------------
  bindCopy();

  if (document.body.hasAttribute("data-landing")) {
    // The "/" landing renders CommonMark; normalise to a real flavour URL.
    var saved = preferred();
    var target = saved && linkFor(saved) ? saved : "commonmark";
    var link = linkFor(target);
    if (target === "commonmark") {
      // Content is already CommonMark — just rewrite the URL and remember it.
      if (link) history.replaceState({ flavour: "commonmark" }, "", link.getAttribute("href"));
      setActive("commonmark");
      remember("commonmark");
    } else if (link) {
      load(link.getAttribute("href"), target, "replace");
    }
  } else {
    remember(currentFlavour());
  }
})();
