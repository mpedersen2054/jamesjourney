

export function getBrowserDems() {
  var $browserDems = $('.browser-dems');
  var windowSize   = { width: $(window).width(), height: $(window).height() }

  $browserDems
    .append(`<h3>Browser Dementions</h3><hr />`)
    .append(`<div class="window-width"><b>width:</b> ${windowSize.width}px</div>`)
    .append(`<div class="window-height"><b>height:</b> ${windowSize.height}px</div>`)

}