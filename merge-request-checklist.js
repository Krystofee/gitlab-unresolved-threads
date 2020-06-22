if (
  /^https:\/\/gitlab\.*.*\/.*\/merge_requests\/?(\?.*)?$/.test(
    window.location.href
  )
) {
  function prependChecklist(url) {
    $.get(url, function(html) {
      const checklist = $("#wiki_content", html).val();
      $("#merge_request_description").val(function(index, old) {
        return checklist + "\n" + old;
      });
    });
  }

  var insertChecklistButton = $("<button/>", {
    text: "Insert checklist",
    type: "button",
    click: () =>
      prependChecklist(
        "https://gitlab.com/petrboros/retino/wikis/Merge-request/edit"
      )
  });

  $(".detail-page-description .col-sm-10").append(insertChecklistButton);
}
