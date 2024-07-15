document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const shoppingList = document.getElementById('shoppingList');
    const clearButton = document.getElementById('clearButton');
  
    // Load items from local storage
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
  
    // Function to add item to the list
    function addItem() {
      const itemName = itemInput.value.trim();
      if (itemName !== '') {
        items.push({ name: itemName, purchased: false });
        renderList();
        itemInput.value = '';
        itemInput.focus();
        saveToLocalStorage();
      }
    }
  
    // Function to mark item as purchased
    function markPurchased(event) {
      if (event.target.tagName === 'LI') {
        const index = event.target.getAttribute('data-index');
        items[index].purchased = !items[index].purchased;
        renderList();
        saveToLocalStorage();
      }
    }
  
    // Function to clear the list
    function clearList() {
      items = [];
      renderList();
      saveToLocalStorage();
    }
  
    // Function to edit an item
    function editItem(event) {
      if (event.target.tagName === 'LI') {
        const index = event.target.getAttribute('data-index');
        const newValue = prompt('Edit item:', items[index].name);
        if (newValue !== null && newValue.trim() !== '') {
          items[index].name = newValue.trim();
          renderList();
          saveToLocalStorage();
        }
      }
    }
  
    // Function to render the list
    function renderList() {
      shoppingList.innerHTML = '';
      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.setAttribute('data-index', index);
        if (item.purchased) {
          li.classList.add('purchased');
        }
        shoppingList.appendChild(li);
      });
    }
  
    // Function to save list to local storage
    function saveToLocalStorage() {
      localStorage.setItem('shoppingList', JSON.stringify(items));
    }
  
    // Event listeners
    addButton.addEventListener('click', addItem);
    itemInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addItem();
      }
    });
    shoppingList.addEventListener('click', markPurchased);
    shoppingList.addEventListener('dblclick', editItem);
    clearButton.addEventListener('click', clearList);
  
    // Initial render
    renderList();
  });
  