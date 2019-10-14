if (
  /^https:\/\/gitlab\.com/.test(window.location.href) &&
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
}
