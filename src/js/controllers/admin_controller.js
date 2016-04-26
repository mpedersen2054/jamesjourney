
import $ from 'jquery';
import tokenfield from 'bootstrap-tokenfield';

export function tokenField(elem) {
  const $newBlogTokenField = $('#new-blog-tokenfield');

  console.log('hello tokenfield')
  // $newBlogTokenField.tokenfield()
  // $(elem).tokenfield({
  //   autocomplete: {
  //     source: ['red','blue','green','yellow','violet','brown','purple','black','white'],
  //     delay: 100
  //   },
  //   showAutocompleteOnFocus: true
  // })
}

export function contentPreviewCount() {
  var currentNum;
  var maxNum          = 600;
  var $contentPreview = $('.content-preview-input');
  var $currentCount   = $('.current-count');
  var $maxNum         = $('.current-count__max');
  var $currentNum     = $('.current-count__current');

  $contentPreview.on('keyup', function() {
    currentNum = $contentPreview.val().length;
    $currentNum.text(currentNum);
  })
}
