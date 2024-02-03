// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () =>
{
  const apiKey = '8d6e2fc06c0a0c5cb22a332ef40117ca';
  const ts = '1705943419297';
  const hash = 'b8bc44fe294721ba4c8f922bbed87a1a';

  const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

 // Selecting DOM elements
  var searchButton = document.getElementById("btn");
  
  var description = document.querySelector(".description");
  
  var Superheroname = document.querySelector(".name");
  
  var superheroImage = document.getElementById("photo");
  
  var main = document.querySelector(".main");
  
  var searchBox = document.getElementById("search-bar");
  
  var favBtn = document.getElementById("fav-btn");
  
  var heroList = document.getElementById("heroList");

  var search = document.getElementById("searchSuggestions")

  var cancel = document.getElementById("cancel-btn")
  const arr = [];// Array to store superhero names

  var text="" // Variable to store search text

 //Fetch superhero names from Marvel API on input focus
  searchBox.addEventListener("click", async function fetchData() 
  {
    
    await fetch(apiUrl)
      
      .then((responseData) =>
       {
        return responseData.json();
       })
      .then((obtData) => 
      {
          for (var i = 0; i < obtData.data.results.length; i++)
           {
              arr[i] = `${obtData.data.results[i].name}`;
           }

        console.log(obtData);
      });
      // console.log(arr);
      // text = arr.toString();
      // console.log("string :",text);
      // suggestions(text)
    });
    
  
  
  
  // Event listener for input changes in the search box
  searchBox.addEventListener("input", () => 
  {
      var str= searchBox.value
    
      heroList.innerHTML = "";
      let suggestionList = document.createElement("div");
      suggestionList.setAttribute("id","suggestions")
    
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].toLowerCase().includes(str.toLowerCase())) 
        {
          // suggestionList.style.height="100%"
          
          suggestionList.innerHTML = arr[i];
          suggestionList.addEventListener("click", function(event) {
           console.log(event.target.innerText);
           searchBox.value=event.target.innerText
            
          });
          heroList.appendChild(suggestionList);
        }
      }
    


  });

  searchButton.addEventListener("click", () => 
  {
    console.log("true");

    search.style.height="auto"
    
    heroList.style.display="none"
    
    let text = searchBox.value;
    
    searchBox.value = " ";

  
    console.log(text);
          if (text.length < 1) 
          {
              alert("enter complete name");
             location.reload();
          } 
          else 
          {
              fetchInfo(text);
          }
  });




  // Function to fetch superhero information based on the search text

  async function fetchInfo(searchText) 
  {

    await fetch(apiUrl)
      .then((res) => 
    {
            return res.json();
    })
      .then((data) => 
    {
            console.log(data);
       
        var newText = searchText.toString();
       
        for (let i = 0; i < data.data.results.length; i++)
         {
           var elementName = data.data.results[i].name;
        
           var imagePath = data.data.results[i].thumbnail.path;
        
           var imageExt = data.data.results[i].thumbnail.extension;

           if (elementName.split(" ").join("").toLowerCase() == newText.split(" ").join("").toLowerCase()) 
            {
              main.style.display = "block";
          
              Superheroname.innerHTML = elementName;
          
              description.innerHTML = data.data.results[i].description;

              superheroImage.src = `${imagePath}/portrait_medium.${imageExt}`;
          
              console.log(`${imagePath}/portrait_xlarge.${imageExt}`);

              favBtn.addEventListener("click", () => 
                {
                  var elementId = data.data.results[i].id;
               
                  window.localStorage.setItem(elementId, data.data.results[i].name);
               
                  location.reload();
                });
            }
         }
      });
  }
 // Event listener for the cancel button
  cancel.addEventListener("click",()=>
  {
    location.reload();
  })

});
