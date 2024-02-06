// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => 
{
   const apiKey = "8d6e2fc06c0a0c5cb22a332ef40117ca";
   const ts = "1705943419297";
   const hash = "b8bc44fe294721ba4c8f922bbed87a1a";
  // Selecting DOM elements
  var searchButton = document.getElementById("btn");

  var description = document.querySelector(".description");

  var Superheroname = document.querySelector(".name");

  var superheroImage = document.getElementById("photo");

  var main = document.querySelector(".main");

  var searchBox = document.getElementById("search-bar");

  var favBtn = document.getElementById("fav-btn");

  var heroList = document.getElementById("heroList");

  var search = document.getElementById("searchSuggestions");

  var cancel = document.getElementById("cancel-btn");
  const arr = []; // Array to store superhero names

  var text = ""; // Variable to store search text

  //Fetch superhero names from Marvel API on input focus
  searchBox.addEventListener("keyup", async function fetchData() 
  {
    if (searchBox.value.length > 2)
     {
        var query = searchBox.value;
        var apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=26cd8e7d36c0122137914a00f6b87862&hash=f7fb73edbdb6b9355a7c4c7a6a7d68b9`;
        await fetch(apiUrl)
          .then((responseData) => {
            return responseData.json();
          })
          .then((obtData) => 
        {
          for (var i = 0; i < obtData.data.results.length; i++) {
            arr[i] = `${obtData.data.results[i].name}`;
          }


          console.log(arr);

          // Event listener for input changes in the search box

          // var str= searchBox.value

          heroList.innerHTML = "";

          for (let i = 0; i < arr.length; i++) {
            if (arr[i].toLowerCase().includes(query.toLowerCase())) {
            
              let suggestionList = document.createElement("div");
              suggestionList.setAttribute("id", "suggestions");
              suggestionList.innerHTML = arr[i];

              suggestionList.addEventListener("click", function (event) {
                console.log(event.target.innerText);
                searchBox.value = event.target.innerText;
              });
              heroList.appendChild(suggestionList);
            }
          }

          searchButton.addEventListener("click", () => {
            console.log("true");

            search.style.height = "auto";

            heroList.style.display = "none";

            let text = searchBox.value;

            searchBox.value = " ";

            fetchInfo(text);
          });

          // Function to fetch superhero information based on the search text

          function fetchInfo(searchText) 
          {
           

            var newText = searchText.toString();

            for (let i = 0; i < obtData.data.results.length; i++) 
            {
              var elementName = obtData.data.results[i].name;

              var imagePath = obtData.data.results[i].thumbnail.path;

              var imageExt = obtData.data.results[i].thumbnail.extension;

              if (
                elementName.split(" ").join("").toLowerCase() ==
                newText.split(" ").join("").toLowerCase()
              ) 
              {
                main.style.display = "block";

                Superheroname.innerHTML = elementName;

                description.innerHTML = obtData.data.results[i].description;

                superheroImage.src = `${imagePath}/portrait_medium.${imageExt}`;

                console.log(`${imagePath}/portrait_xlarge.${imageExt}`);

                favBtn.addEventListener("click", () =>
                 {
                  var elementId = obtData.data.results[i].id;

                  window.localStorage.setItem(
                    elementId,
                    obtData.data.results[i].name
                  );

                  location.reload();
                });
              }
            }
          }
        });
     }
  });
  // Event listener for the cancel button
    cancel.addEventListener("click", () => 
    {
      location.reload();
    });
});
