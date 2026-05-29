(function () {
  "use strict";

  // --- Copy to clipboard ---------------------------------------------------
  var toast = document.getElementById("copied");
  var toastTimer;

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
    // Legacy fallback for non-secure contexts.
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

  function copyFromLegend(legend) {
    var target = document.getElementById(legend.getAttribute("data-copy"));
    if (target) copy(target.value);
  }

  document.querySelectorAll("legend[data-copy]").forEach(function (legend) {
    legend.addEventListener("click", function () {
      copyFromLegend(legend);
    });
    legend.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        copyFromLegend(legend);
      }
    });
  });

  // --- Headroom: hide the bar on scroll down, reveal on scroll up ----------
  var header = document.querySelector("header");
  if (header) {
    var lastY = window.pageYOffset;
    header.classList.add("is-pinned");

    window.addEventListener(
      "scroll",
      function () {
        var y = window.pageYOffset;
        if (y > lastY && y > header.offsetHeight) {
          header.classList.remove("is-pinned");
          header.classList.add("is-unpinned");
        } else {
          header.classList.remove("is-unpinned");
          header.classList.add("is-pinned");
        }
        lastY = y;
      },
      { passive: true }
    );
  }
})();
