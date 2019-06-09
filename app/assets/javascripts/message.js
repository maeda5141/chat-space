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
    .done(function (data) {
      var html = buildhtml(data);
      $('.chat_lists').append(html);
      $('#message_body').val('');
      $('#message_upload-icon').val('');
      $('.send').val('Send').attr('disabled', false);
      $('.main_middle').animate({scrollTop: $('.chat_lists')[0].scrollHeight})
    })
    .fail(function () {
      alert('メッセージが入力されていません');
      $('.send').val('Send').attr('disabled', false);
    })
    
  });
});