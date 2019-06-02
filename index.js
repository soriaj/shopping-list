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
   // with event deletegation
   $('ul').on('click', '.shopping-item-toggle', function(event){
      // 4a. Get current target
      const targetItem = $(this).parent().parent();
      const otherItems = $('.shopping-item').not(targetItem);
      otherItems.removeClass('shopping-item__checked');
      targetItem.toggleClass('shopping-item__checked');
   })

   //    4b. If check is clicked again, toggle off .shopping class on text
   // 5. Add event listener on delete button with class .shopping-item-delete
   // 6. Remove li item
})