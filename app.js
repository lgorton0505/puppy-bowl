const numSpan = document.querySelector("#puppyNumber");
const goBackSpan = document.querySelector("#goBack");
const ul = document.querySelector("ul");
let puppies = [];
let singleItem = false;

window.addEventListener('hashchange', render);


/**
 * Renders the puppies on the page based on the current filter.
 */
function render(){
  numSpan.innerHTML = puppies.length;
  const hash = window.location.hash;
  const id = hash.slice(1)*1;
  let filtered = puppies;
  console.log(filtered);
  if(id){
     filtered = filtered.filter(function(puppy){
        return puppy.id === id; 
     });
  }

  /// If there is only one puppy, show the "Back to Puppies" link
  if (filtered.length === 1) {
    goBackSpan.innerHTML = "Back to Puppies";
    goBackSpan.style.display = "inline";
    singleItem = true;
  } else {
    goBackSpan.style.display = "none";
    singleItem = false;
  }

   const html = filtered.map(function(puppy){
      if (singleItem === true) {
        return `
          <li id='singleItem'>
             <h4><a href='#${puppy.id}'>${puppy.name}</a><h4>
             <p>${puppy.breed}</p>
             <img src='${puppy.imageUrl}' />
          </li>
       `;
      } else {
        return `
          <li>
             <h4><a href='#${puppy.id}'>${puppy.name}</a><h4>
             <p>${puppy.breed}</p>
             <img src='${puppy.imageUrl}' />
         </li>
      `;
      }
   }).join('');
   ul.innerHTML = html;
}


render();

async function getPuppies() {
  const res = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players");
  const json = await res.json();
  puppies = json.data.players;
  console.log(puppies);
  render();
}

getPuppies();