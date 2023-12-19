const numSpan = document.querySelector("#puppyNumber");
const goBackSpan = document.querySelector("#goBack");
const ul = document.querySelector("ul");
let puppies = [];

window.addEventListener('hashchange', render);


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
  if (filtered.length === 1) {
    goBackSpan.innerHTML = "Go back";
    goBackSpan.style.display = "inline";
  } else {
    goBackSpan.style.display = "none";
  }
   const html = filtered.map(function(puppy){
       return `
          <li>
             <h4><a href='#${puppy.id}'>${ puppy.name }</a><h4>
             <p>${ puppy.breed }</p>
             <img src='${ puppy.imageUrl }' />
          </li>
       `;
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