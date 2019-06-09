$(function () {

  function buildhtml(message) {
    var imageTag =  function (message) {
      var imageUrl = message.image.url;
      
      if (imageUrl !== null ) {
      return  `<img src=${imageUrl} alt=${imageUrl}></img>`
      } else {
        return ''
      }
    } 
    var sendTime = String(message.created_at);
    var html = `
    <li>
  <p>
    ${message.name}
    <span>
      ${sendTime.replace("T", " ").replace(".000+09:00", "")}
    </span>
  </p>
  <p>
    ${message.body}
  </p>
  <p>
    ${imageTag(message)}
    </p>
</li>
`
return html;
  }
  $('.new_message').on('submit', function (e) {
    e.preventDefault();
    formData = new FormData(this);
    $.ajax({
      type: 'POST',
      url:  window.location.href,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (message) {
      var html = buildhtml(message);
      $('.chat_lists').append(html);
      
      $('.new_message')[0].reset();
      $('.send').val('Send').attr('disabled', false);
      $('.main_middle').animate({scrollTop: $('.chat_lists')[0].scrollHeight})
    })
    .fail(function () {
      alert('メッセージが入力されていません');
      $('.send').val('Send').attr('disabled', false);
    })
    
  });
});