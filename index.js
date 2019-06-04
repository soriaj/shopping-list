'use strict';

const STORE = [
  {id: cuid(), name: "apples", checked: false},
  {id: cuid(), name: "oranges", checked: false},
  {id: cuid(), name: "milk", checked: true},
  {id: cuid(), name: "bread", checked: false}
];

function generateItemElement(item){
   return `
      <li data-item-id="${item.id}">
         <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
         <div class="shopping-item-controls">
            <button class="shopping-item-toggle js-item-toggle">
               <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
            </button>
         </div>
      </li>`;
}

function generateShoppingitemsString(shoppingList){
   console.log(`Generating shopping list element`);
   const items = shoppingList.map(item => generateItemElement(item));

   return items.join('');
}

function renderShoppingList() {
   // this function will be responsible for rendering the shopping list in the DOM
   console.log('`renderShoppingList` ran');
   const shoppingListItemsString = generateShoppingitemsString(STORE);

   // insert that HTML into the DOM
   $('.js-shopping-list').html(shoppingListItemsString);
 } 
 
function addItemToShoppingList(itemName){
   console.log(`Adding "${itemName}" to the shopping list`);
   STORE.push({id: cuid(), name: itemName, checked: false});
}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  console.log('`handleNewItemSubmit` ran');
  // set event listener on form on submit
  $('#js-shopping-list-form').submit(function(event){
     // prevent default page refresh on submit action
     event.preventDefault();
     console.log('`handlenewItemSubmit` ran');
     // Get value entered by use from .js-shopping-list-entry
     const newItemName = $('.js-shopping-list-entry').val();
     $('.js-shopping-list-entry').val('');

     // Update STORE and Re-render the shopping list
     addItemToShoppingList(newItemName);
     renderShoppingList();
   });
}

// function to toggle checked property in STORE
function toggleCheckedForListItem (itemId){
   console.log(`Toggling checked property for item with id: ${itemId}`);
   // create constant item. Call array STORE with method find. Return the first value, the object, that 
   // matches the itemID
   const item = STORE.find(item => item.id === itemId);
   // set objects property item checked to opposite of current state.
   item.checked = !item.checked;
}

 // Gets item from the STORE array
function getItemIdFromElement (item){
   // passes the event.currentTarget of Check button click. Traverses up the DOM to the parent 'li'
   // then calls the data method and gets the item-id attribute from html as a string
   return $(item).closest('li').data('item-id');
}

function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on a shopping list item.
  console.log('`handleItemCheckClicked` ran');
  // Event listener on ul class .js-shopping-list. Listening for click on button with class js-item-toggle
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event){
     console.log('`handleItemCheckClicked` ran');
     // id calls getItemIdFromElement using the event.currentTarget, which is the button check.
     const id = getItemIdFromElement(this);
     // function execution with argument id
     toggleCheckedForListItem(id);
     renderShoppingList();
  });
}
  
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list item
  console.log('`handleDeleteItemClicked` ran')
}
 
/* this function will be our callback when the page loads. it's responsible for
initially rendering the shopping list, and activating our individual functions
that handle new item submission and user clicks on the "check" and "delete" buttons
for individual shopping list items.
*/
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
 
}
 
// when the page loads, call `handleShoppingList`
$(handleShoppingList);