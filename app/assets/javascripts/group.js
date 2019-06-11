$(function () {
  var resultArea = '#user-search-result';
  var formFieldRight = ".chat-group-form__field--right:eq(2)";

  $('#user-search-field').on('keyup', function () {
    var input = $('#user-search-field').val()
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
      processData: true,
      contentType: false
    })
    .done(function (users) {
      $(resultArea).empty();
      if (users.length !== 0) {
      users.forEach(function (user) {

        var html = `<div class="user" id="${user.id}">${user.name}<div class="user__append">追加</div></div>`;
        $(resultArea).append(html);
      });
        } else {
          $(resultArea).append('<div class="no_users">一致する検索結果がありません</div>');
        }
    })
    .fail(function () {
      alert('ユーザー検索に失敗しました');
      
    });
    
  });

  
  
  $(resultArea).on('click','.user__append' ,function () {
    var userName = $(this).parent().text().replace('追加', '');
    var userId = $(this).parent().attr('id');
    
    $(this).parent().remove();

    $(formFieldRight).prepend(`<div class="user" id="${userId}">${userName}<div class="user__remove">削除</div></div>`);
    $(formFieldRight).append(`<input name='group[user_ids][]' type='hidden' value=${userId}>`);

  });
  $(formFieldRight).on('click','.user__remove' ,function () {
    var userName = $(this).parent().text().replace('削除', '');
    var userId = $(this).parent().attr('id');
    $(this).parent().remove();
    $(`input[value=${userId}]`).remove();
    $(resultArea).append(`<div class="user" id="${userId}">${userName}<div class="user__append">追加</div></div>`);

  });
});