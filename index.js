$(function() {
   // 1. Set event listener for submit button
   $('#js-shopping-list-form').submit(function(event) {
      // 1a. Stop default form submission behavior
      event.preventDefault();
      // 2. Get value from #shopping-list-entry
      let item = $(this).find('#shopping-list-entry');
      
      // 3. Append ul class .shopping-list with item
      $('.shopping-list').append(`
         <li>
         <span class="shopping-item">${item.val()}</span>
         <div class="shopping-item-controls">
            <button class="shopping-item-toggle">
               <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete">
               <span class="button-label">delete</span>
            </button>
         </div>
         </li>
      `);
      // 3a. Clear input value
      item.val("");
   });
   
   // 4. Add event listener on existing element ul, specifically with class .shopping-item-toggle on button
   $('.shopping-list').on('click', '.shopping-item-toggle', function(event){
      // 4a. From target get the li and find .shopping-item class
      $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
   });

   // 5. Add event listener on delete button with class .shopping-item-delete
   $('.shopping-list').on('click', '.shopping-item-delete', function(event){
      // 5a. From target get the li and remove it
      $(this).closest('li').remove();
   });
})