if (
  /^https:\/\/gitlab\.*.*\/merge_requests\/?(\?.*)?$/.test(
    window.location.href
  )
) {
  let isSmall = false;
  let completedColor = "#8fc7a6";
  let incompleteColor = "#ffd3d3";

  chrome.storage.local.get('isSmall', function (result) {
    isSmall = result.isSmall
  });

  // Get current isSmall value.
  chrome.storage.local.get('completedColor', function (result) {
    completedColor = result.completedColor || '#8fc7a6';
  });

  // Get current isSmall value.
  chrome.storage.local.get('incompletedColor', function (result) {
    incompleteColor = result.incompletedColor || '#ffd3d3';
  });

  function createThreadsBadge(element, color, resolved, resolvable) {
    let badgeLabel = `${resolved}/${resolvable}`;
    if (!isSmall) {
       badgeLabel += ` threads resolved`;
    }

    const li = $("<li/>")
      .addClass("issuable-comments d-none d-sm-flex")
      .prependTo(element);
    $("<span/>")
      .addClass("badge color-label")
      .css("background-color", color)
      .css("color", "#333333")
      .text(badgeLabel)
      .prependTo(li);
  }

  $(".merge-request").each(function() {
    const anchor = $(this).find(".merge-request-title-text a")[0];
    const metaList = $(this).find(".issuable-meta ul")[0];

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
          createThreadsBadge(metaList, incompleteColor, resolved, resolvable);
        } else if (resolved === resolvable && resolvable > 0) {
          createThreadsBadge(metaList, completedColor, resolved, resolvable);
        }
      }
    });
  });
}
