// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => 
{
  // Get all elements with the class 'close'
  var closebtns = document.getElementsByClassName("close");
  
  // Initialize variables
  var i;
  var fav_container = document.getElementById("fav-container");
  
  // Loop through localStorage to display stored superhero names
  for (var i = 0; i < localStorage.length; i++) 
  {
    displayItem(localStorage.getItem(localStorage.key(i)), localStorage.key(i));
  }
  
  // Function to display each item in the localStorage
  function displayItem(value, key) 
  {
    var list = document.getElementById("localStorageList");
    
    var listItem = document.createElement("li");
    
    var span = document.createElement("span");
    
    // Set class and content for the 'close' span
    span.className = "close";
    
    span.innerHTML = "&times;";
    
    // Set text content for the list item
    listItem.textContent = value;
    
    // Append the 'close' span to the list item
    listItem.appendChild(span);
    
    // Append the list item to the unordered list
    list.appendChild(listItem);
    
    // Append the unordered list to the fav_container
    fav_container.appendChild(list);
    
    // Add event listener to the 'close' span to remove the item from localStorage and reload the page
    span.addEventListener("click", () => 
    {
      localStorage.removeItem(key);
    
      location.reload();
    });
  }
});
