if (
  /^https:\/\/gitlab\.*.*\/merge_requests\/?(\?.*)?$/.test(
    window.location.href
  )
) {
  function createThreadsBadge(element, color, resolved, resolvable) {
    const li = $("<li/>")
      .addClass("issuable-comments d-none d-sm-flex")
      .prependTo(element);
    $("<span/>")
      .addClass("badge color-label")
      .css("background-color", color)
      .css("color", "#333333")
      .text(`${resolved}/${resolvable} threads resolved`)
      .prependTo(li);
  }

  $(".merge-request").each(function() {
    const anchor = $(this).find(".merge-request-title-text a")[0];
    const metaList = $(this).find(".issuable-meta ul, ul.controls")[0];

    $.ajax({
      url: `${anchor.href}/discussions.json`,
      success: function(result) {
        let resolvable = 0;
        let resolved = 0;
        result.forEach(item => {
          if (item.resolvable) resolvable++;
          if (item.resolved) resolved++;
        });

        if (resolvable > resolved) {
          createThreadsBadge(metaList, "#ffd3d3", resolved, resolvable);
        } else if (resolved === resolvable && resolvable > 0) {
          createThreadsBadge(metaList, "#8fc7a6", resolved, resolvable);
        }
      }
    });
  });
}
