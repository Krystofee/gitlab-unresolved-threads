var isRefreshing = false;

function doIt() {
  if (
    !isRefreshing &&
    /^https:\/\/gitlab\.com.*\/diffs/.test(window.location.href) &&
    !/\?.*w=1/.test(window.location.href)
  ) {
    var str = "";
    if (/\?(.+=.*&)*$/.test(window.location.href)) {
      str = "";
    } else if (/\?(.+=.*&)*.+=.*[^&]$/.test(window.location.href)) {
      str = "&";
    } else {
      str = "?";
    }

    window.location = window.location.toString() + str + "w=1";
    isRefreshing = true;
    setTimeout(function() {
      isRefreshing = false;
    }, 2000);
  }
}

doIt();

setInterval(doIt, 200);
