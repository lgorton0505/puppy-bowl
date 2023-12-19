const span = document.querySelector("span");
const ul = document.querySelector("ul");
let puppies = [];

function render(){
  span.innerHTML = puppies.length;
  const hash = window.location.hash;
  const id = hash.slice(1)*1;
  let filtered = puppies;
  console.log(filtered);
  if(id){
     filtered = filtered.filter(function(puppy){
        return puppy.id === id; 
     });
  }
   const html = filtered.map(function(puppy){
       return `
          <li>
             <h4><a href='#${puppy.id}'>${ puppy.name }</a><h4>
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