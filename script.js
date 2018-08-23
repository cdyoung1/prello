const addBtnCard = $('.add-card-btn'), cardForm = $('.card-form');
let addMessage = '';
var listItem = $('.list-item');
var cardContainer = $('.card-container')
var listHeader = $('.list-header');
var draggableListItem = new window.Draggable.Sortable(listItem, {
    draggable: '.draggable-item',
    appendTo: '.card-container',
});

draggableListItem.on('drag:move', function(){
    console.log('list item sorted!');
    addBtnMessage();
});

var draggableList = new window.Draggable.Sortable(listHeader, {
    draggable: '.list-wrapper',
    appendTo: '.board',
})
$(function(){
    addBtnMessage();
})
function addBtnMessage(){
    let listCards = 0;
    listCards = $('.board').find('.list-wrapper');
    console.log('listcards',listCards);
    if(listCards.length>0){
        for(let i=0; i<listCards.length; i++){
            let temp = listCards[i];
            if($(temp).find('.draggable-item').length>0){
                console.log('entered')
                addMessage = 'Add another card';
            } else {
                addMessage = "Add a card";
            }
            console.log('addmessage', addMessage)
            $(temp).find('.add-card-btn .add-card-message')[0].innerHTML = addMessage;
        }
    } else{
        console.log('No lists found.')
    }

}
draggableList.on('sortable:sorted', function(){
    console.log('list sorted')
})

$(addBtnCard).on('click',function(e) {
    let accessForm = $(e.target.closest('.list-container')).find(cardForm)[0];
    let accessBtn = $(e.target.closest('.list-container')).find(addBtnCard)[0];
    console.log('accessForm', accessForm);
    console.log(accessBtn);
    $(accessForm).removeClass('hidden');
    $(accessBtn).addClass('hidden');
    addBtnMessage();
    // cardForm.removeClass('hidden');
    // addBtnCard.addClass('hidden');
    
})

$('.card-close-btn').on('click', function(e){
    let accessForm = $(e.target.closest('.list-container')).find(cardForm)[0];
    let accessBtn = $(e.target.closest('.list-container')).find(addBtnCard)[0];
    console.log('accessForm', accessForm);
    console.log(accessBtn);
    $(accessForm).addClass('hidden');
    $(accessBtn).removeClass('hidden');
    addBtnMessage();
})
// function generateCard(title){
//     return 
//     `${<div class="card draggable-item"><p>${title}</p></div>}`
    
// }

$('.card-add-btn').on('click', function(e){
    let accessTitle = $(e.target.closest('.list-container')).find('.card-content')[0].value;
    let accessList = $(e.target.closest('.list-container')).find(listItem)[0];  
    let accessForm = $(e.target.closest('.list-container')).find(cardForm)[0];
    let accessBtn = $(e.target.closest('.list-container')).find(addBtnCard)[0];
    // let newCard = generateCard(accessTitle);
    $(accessList).add(`<div class="card draggable-item"><p>${accessTitle}</p></div>`).appendTo(accessList);
    $(e.target.closest('.list-container')).find('.card-content')[0].value = '';
    $(accessForm).addClass('hidden');
    $(accessBtn).removeClass('hidden');
})