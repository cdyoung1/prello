$('#sign-out-btn').on('click', function(e) {
    $.ajax({
        url: 'http://localhost:3000/logout',
        method: 'GET'
    })
    .done(function(e) {
        window.location.href = 'http://localhost:3000/login'
        console.log('logged out');
    })
    .fail(function(error) {
        console.log(error)
    })
})
function closeBoardForm(e) {
    $('.board-form-container').addClass('hidden');  
    $('body').removeClass('body-fixed'); 
}
$('.open-board-form').on('click', function(e) {
    console.log('hello')
    $('.board-form-container').removeClass('hidden');
    $('body').addClass('body-fixed');
});

$('.board-form-bg').on('click', function(e) {
    $('.board-form').find('.board-form-title')[0].value = '';
    closeBoardForm(e);
})

$('.add-board-btn').on('click', function(e) {
    let newBoardTitle = $('.board-form').find('.board-form-title')[0].value;
    console.log('title', newBoardTitle)
    let boardList = $('.board-list');
    $('.open-board-form').before(`
        <div class="board">
            <h4 class="board-title">${newBoardTitle}</div>
        </div>
    `);
    $('.board-form').find('.board-form-title')[0].value = '';
    closeBoardForm(e);
    $.ajax({
        url: 'http://localhost:3000/boards/personal',
        method: 'POST',
        data: {
            title: newBoardTitle
        }
    })
    .done(function() {
        window.location.href = 'http://localhost:3000/index';
    })
    .fail(function(err) {
        console.error(err);
    })
})