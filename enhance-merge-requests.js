if (/^https:\/\/gitlab\.*.*\/merge_requests\/?(\?.*)?$/.test(window.location.href)) {
  function createThreadsBadge(element, color, resolved, resolvable) {
    const li = $("<li/>").addClass("issuable-comments d-none d-sm-flex").prependTo(element);
    $("<span/>")
      .addClass("badge color-label")
      .css("background-color", color)
      .css("color", "#333333")
      .text(`${resolved}/${resolvable} threads resolved`)
      .prependTo(li);
  }

  function run() {
    $(".issue").each(function () {
      const anchor = $(this).find(".issue-title a")[0];
      const metaList = $(this).find(".issuable-meta ul, ul.controls")[0];

      if (!anchor || !metaList) return;

      $.ajax({
        url: `${anchor.href}/discussions.json`,
        success: function (result) {
          let resolvable = 0;
          let resolved = 0;
          result.forEach((item) => {
            if (item.resolvable) resolvable++;
            if (item.resolved) resolved++;
          });

          if (resolvable > resolved) {
            createThreadsBadge(metaList, "#ffd3d3", resolved, resolvable);
          } else if (resolved === resolvable && resolvable > 0) {
            createThreadsBadge(metaList, "#8fc7a6", resolved, resolvable);
          }
        },
      });
    });
  }

  try {
    if (typeof MutationObserver !== "undefined") {
      const targetNode = document.querySelector(".content-list");

      if (targetNode) {
        const observer = new MutationObserver(run);

        const config = {
          childList: true, // Observe additions/removals of child nodes
          attributes: false, // Observe attribute changes
          subtree: false, // Observe changes in all descendants
          characterData: false, // Observe text content changes
        };

        observer.observe(targetNode, config);

        console.log("MutationObserver is now watching .content-list");
      } else {
        throw new Error(".content-list element not found!");
      }
    } else {
      throw new Error("MutationObserver is not supported in this environment.");
    }
  } catch (error) {
    console.error("MutationObserver setup failed:", error.message);

    setTimeout(() => {
      run();
    }, 3000);
  }
}
