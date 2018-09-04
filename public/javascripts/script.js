const boardBody = $('.board-body');
const listsContainer = $('.lists-container');
const listWrapper = $('.list-wrapper'); 
const list = $('.list');
const listHeader = $('.list-header');
const listForm = $('.list-form');
const openListForm = $('.open-list-form');
const listAddBtn = $('.list-add-btn');
const closeListForm = $('.list-close-btn');
const cardContainer = $('.card-container')
const cardList = $('.card-list')
const cardForm = $('.card-form');
const cardContent = $('.card-content');
const openCardForm = $('.open-card-form');
const cardFormMessage = $('.card-form-message')
const cardAddBtn = $('.card-add-btn');
const closeCardForm = $('.card-close-btn');
const descriptionContent = $('textarea .description-content');
const submitDescriptionBtn = $('.submit-description-btn');
const descriptionCloseBtn = $('.description-close-btn');
let addMessage = '', listMessage='';
let draggableCard, draggableList;
let easeModal, easeContent;
let description = '';
searching = false;
$(function(){
    var curDown = false,
        curYPos = 0,
        curXPos = 0;
    $(window).mousemove(function(m){
      if(curDown === true){
       $(window).scrollTop($(window).scrollTop() + (curYPos - m.pageY)); 
       $(window).scrollLeft($(window).scrollLeft() + (curXPos - m.pageX));
      }
    });
    $('.board-body').on('mousedown', '.list-wrapper', function(e){
        let target = $(e.target)[0];
        console.log($(target).closest('.list'))
        if($(target).closest('.list').length==0){
            curDown = true;
            curYPos = e.pageY;
            curXPos = e.pageX;
        }
    })
    $(window).mousedown(function(m){

      let target = $(m.target)[0];
      if(target==$('.list-wrapper')[0] && $(target).closest('.open-list-form').length<=0 
      && $(target).closest('.list-form').length<=0){
        curDown = true;
      }
      curYPos = m.pageY;
      curXPos = m.pageX;
      console.log(curDown)
    });
    
    $(window).mouseup(function(){
      curDown = false;
    });
  })
$(function(){
    addBtnMessage();
    addListMessage();
   
    easeModal = anime({
        targets: '.card-modal',
        opacity: 1,
        duration: 400,
        easing: 'linear'
    });
    easeContent = anime({
        targets: '.modal-content',
        top:'50%',
        duration: 250,
        easing: 'easeOutSine'
    })
    function closeModal(){
        easeModal.reverse();
        easeContent.restart();
        easeContent.reverse();

        setTimeout(function(e){
            $('body').removeClass('body-fixed');
            $('.card-modal').addClass('hidden');
        },400);
        closeDescription();
        $('.description-content')[0].value = description;

    };
    function closeDescription(){
        $('.description-content-container').addClass('hidden');
        $('.edit-description-btn').removeClass('hidden');
    }
    $('.card-modal').on('click', function(e){
        if(e.target.className != 'submit-description-btn' 
        && e.target.className != 'fas fa-times description-close-btn' 
        && e.target.className != 'description-content'
        && e.target.className != 'description' 
        && e.target.className != "edit-description-btn hidden"){
            closeDescription();
            $('.description-content')[0].value = description;
        }
    })
    $('.edit-description-btn').on('click', function(e){
        $('.description-content-container').removeClass('hidden');
        $('.edit-description-btn').addClass('hidden');
        $('.description-content').focus();
    })
    $('.description-close-btn').on('click', function(e){
        closeDescription();
        $('.description-content')[0].value = description;
    });
    $('.submit-description-btn').on('click', function(){
        closeDescription();
        description = $('.description-content')[0].value;
        tempDescription = description.trim();
        if(tempDescription.length<=0){
            $('.description')[0].innerHTML = 'Add a more detailed description...';
            $('.description-content')[0].value = '';
        } else if(tempDescription.length>0){
            $('.description')[0].innerHTML = tempDescription;
        }

    
    });
    $('.comment-content').on('keyup', function(){
        let temp = $('.comment-content')[0].value;
        $('.submit-comment-btn').attr('disabled', 'disabled');
        if(temp.length>0){
            $('.submit-comment-btn').removeAttr('disabled');
        }
    })
    $('.modal-bg').on('click', closeModal);
    $('.modal-exit').on('click', closeModal);
});
function addBtnMessage(e){
    let listCards = $('.board-body').find('.lists-container .list-wrapper');
    if(listCards.length>0){
        for(let i=0; i<listCards.length; i++){
            let temp = listCards[i];
            if($(temp).find('.list .draggable-source').length>0){
                addMessage = 'Add another card';
            } else {
                addMessage = "Add a card";
            }
            $(temp).find('.card-form-message')[0].innerHTML = addMessage;
        }
    } else{
        console.log('No lists found.')
    }

};
function addListMessage(e){
    let lists = $('.board-body').find('.lists-container .list-wrapper');
    console.log('lists', lists)
    if(lists.length>0){
        console.log('lists exist')
        addListMessage = 'Add another list';
    } else{
        addListMessage = 'Add list';
    }
    $('.open-list-message')[0].innerHTML = addListMessage;
};
draggableCard = new window.Draggable.Sortable($('.card-list'), {
    draggable: '.draggable-source',
    delay: 50
});
draggableCard.on('drag:stop', function(){
    setTimeout(function(){
        addBtnMessage();
    }, 50)
});

draggableList = new window.Draggable.Sortable($('.list-header'), {
    draggable: '.list-wrapper'
});

draggableList.on('drag:stop', function(){
    setTimeout(function(){
        addBtnMessage();
    }, 50)
});


function cardCloseForm(e){
    let accessForm = $(e.target.closest('.list')).find('.card-form')[0];
    let accessBtn = $(e.target.closest('.list')).find('.open-card-form')[0];
    $(accessForm).addClass('hidden');
    $(accessBtn).removeClass('hidden');
}

function closeAllCardForm(){
    $('.open-card-form').removeClass('hidden');
    $('.card-form').addClass('hidden');
}
$('body').on('click','.open-card-form',function(e) {
    $('.open-card-form').removeClass('hidden');
    $('.card-form').addClass('hidden');
    let accessForm = $(this.closest('.list')).find('.card-form')[0];
    let accessContent = $(this.closest('.list')).find('.card-content')[0];
    let accessBtn = $(this.closest('.list')).find('.open-card-form')[0];
    $(accessForm).removeClass('hidden');
    accessContent.focus();
    $(accessBtn).addClass('hidden');
    addBtnMessage();    
});

$('.lists-container').on('click','.card-close-btn', function(e){
    cardCloseForm(e);
    addBtnMessage();
});

$('.lists-container').on('click','.card-add-btn', function(e){
    let accessTitle = $(this.closest('.list')).find('.card-content')[0].value;
    let accessList = $(this.closest('.list')).find('.card-list')[0];  
    let cardTitle = '';
    if (accessTitle.trim().length>0){
        $(accessList).add(`<div class="card draggable-source"><p class="card-p">${accessTitle.trim()}</p></div>`).appendTo(accessList);
    }
    $(this.closest('.list')).find('.card-content')[0].value = '';
    cardCloseForm(e);
    addBtnMessage();

    draggableCard.destroy();
    draggableCard = new window.Draggable.Sortable($('.card-list'), {
        draggable: '.draggable-source',
        delay: 50
    });
    draggableCard.on('drag:stop', function(e){
        let originalSource = $(e.data.originalSource);
        let parentList = $(originalSource).closest('.list');
        let parentListHeader = $(parentList).find('.list-header')[0].innerText;
        cardTitle = $(e.data.originalSource)[0].innerText;
        $('.modal-title')[0].innerHTML = cardTitle;
        $('.modal-list-title')[0].innerHTML = `in list: ${parentListHeader}`;
    })
    
    $('.card-list').on('drag:start', draggableCard, function(e){
        let moving;
        $(this).on('drag:move', function(){
            moving = true;
        })
        $(this).on('drag:stop', function(e){
            if(moving != true){
                $('body').addClass('body-fixed');
                $('.card-modal').removeClass('hidden');
                easeModal.restart();
                easeModal.play();
                easeContent.restart();
                easeContent.play();
            }
        })
    })

    draggableCard.on('drag:stop', function(){
        setTimeout(function(){
            addBtnMessage();
        }, 100)
    });
    
});

$(openListForm).on('click', function(e){
    $(openListForm).addClass('hidden');
    $(listForm).removeClass('hidden');
});

$(closeListForm).on('click', function() {
    $(openListForm).removeClass('hidden');
    $(listForm).addClass('hidden');
});

$('.list-form').on('click', '.list-add-btn', function(e) {

    let tempForm = e.target.closest('.list-form');
    let listTitle = $(tempForm).find('.list-title')[0].value;
    newList = $(listsContainer).append(`
    <div class="list-wrapper">
    <div class="list  draggable-list">
      <div class="list-header">
        <h4>${listTitle}</h4>  
      </div>
      <div class="card-container">
        <div class="card-list">
        </div>
        <div class="card-form hidden">
          <textarea name="card-content" class="card-content" placeholder="Enter a title for this card..." required></textarea>
          <div class="card-btn-row">
            <div class="card-btn-row-left">
              <button class="card-add-btn">Add Card</button>
              <i class="fas fa-times card-close-btn"></i>
            </div>
            <div class="card-add-options">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
        </div>
      <div class="open-card-form">
        <i class="fas fa-plus card-form-sign"></i>
        <h4 class="card-form-message"></h4>
      </div>
    </div>
  </div>
    `);
    addBtnMessage();
    draggableCard.destroy();
    draggableList.destroy();

    draggableCard = new window.Draggable.Sortable($('.card-list'), {
        draggable: '.draggable-source',
        delay: 50
    });

    draggableList = new window.Draggable.Sortable($('.list-header'), {
        draggable: '.list-wrapper'
    });

    draggableCard.on('drag:stop', function(){
        setTimeout(function(){
            addBtnMessage();
        }, 50)
    });

    draggableList.on('drag:stop', function(){
        setTimeout(function(){
            addBtnMessage();
        }, 50)
    });

    $(tempForm).find('.list-title')[0].value = '';
    $('.open-list-message')[0].innerHTML = 'Add another list';
    $(openListForm).removeClass('hidden');
    $(listForm).addClass('hidden');

});
$('.comment-container').on('click', '.submit-comment-btn', function(e) {
    let commentContent = $('.comment-content')[0].value;
    console.log(commentContent);
    let tempComment = commentContent.trim();
    if (tempComment.length>0) {
        let commentTime = new Date();
        commentTime = moment(commentTime).format('MMM D [at] h[:]m A');

        newComment = $('.comment-list').prepend(`
        <div class="comment">
            <span class="user-icon-container"><button class="user-icon">CY</button></span>
            <div class="comment-content-section">
                <div class="comment-header">
                    <h3 class="comment-username">Christian Young</h3>
                    <h4 class="comment-time"> ${commentTime}</h4>
                </div>
                <p class="comment-string">${tempComment}</p>
            </div>
        </div>
        `);
    }
    $('.comment-content')[0].value = '';
})
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
/*
an array of lists
an array of cards in list
temp object containing card info
stored on drag:start
when moved to another list: search through list array and find list
add to array
some unique id for each card(title? but wat if same title)
possibly sort the array of cards in the seen order and grab the info that way?
*/

