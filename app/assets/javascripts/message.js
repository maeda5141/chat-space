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
    <div class="message" data-id=${message.id}>
  <p class=upper-message__user-name>
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
</div>
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
      $('.message_lists').append(html);
      
      $('.new_message')[0].reset();
      $('.send').val('Send').attr('disabled', false);
      $('.main_middle').animate({scrollTop: $('.message_lists')[0].scrollHeight});
    })
    .fail(function () {
      alert('メッセージが入力されていません');
      $('.send').val('Send').attr('disabled', false);
    })
    
  });
  

  var buildMessageHTML = function(message) {

    var bodyHtml = message.body ? `<p class="lower-message__content">${message.body}</p>` : '';
    var imageHtml = message.image.url ? `<p><img src=${message.image.url} class="lower-message__image"></p>` : '';
    var html = 
    `<div class="message" data-id=${message.id}>
    <div class="upper-message">
      <p class="upper-message__user-name">
        ${message.user_name}
      <span class="upper-message__date">
        ${message.created_at.replace('T', ' ').replace('.000+09:00', '')}
      </span>
      </p>
    </div>
    <div class="lower-message">
    ${bodyHtml}
    ${imageHtml}
    </div>
    </div>
    `;

    return html;
  }

  $(document).on('turbolinks:load', function() {
    
    var pathName = $(location).attr('pathname'); 
    console.log(pathName);
    
    console.log($('.group_name').data('id'));
    var reloadMessages = function() {
   
    last_message_id = $('.message_lists > .message:last').data('id');
    var groupId = $('.group_name').data('id')
    $.ajax({
      url: pathName.replace('/messages', '/api/messages'),
      type: 'get',
      dataType: 'json',
      data: {
        id: last_message_id,
        group_id: groupId
      }
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = insertHTML + buildMessageHTML(message);
      });
      $('.message_lists').append(insertHTML);
      
      if (messages.length !== 0) {
        
        $('.main_middle').animate({scrollTop: $('.message_lists')[0].scrollHeight});
      } else {
        return;
      }
    })
    .fail(function() {
     alert('エラーが発生しました。');
    });
  }
  
      if (pathName.match(/\/groups\/\d+\/messages/)) {
        setInterval(reloadMessages, 3000);
      } else {
        return;
        
      }
});
});