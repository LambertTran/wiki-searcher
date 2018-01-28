window.addEventListener("load", function(){
  const btn = document.querySelector('#btn');
  const searchInput = document.querySelector('#searchItem');
  // fire wiki search when btn is click
  btn.addEventListener('click', HandleClickEvent);
  
  searchInput.addEventListener('keyup', function(event){
    event.preventDefault();
    if (event.keyCode === 13){
      btn.click();
    }
  })
})


function HandleClickEvent(){
  const searchItem = document.querySelector('#searchItem').value;
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchItem}&limit=10&namespace=0&format=json&origin=*`;
  GetWikiData(url);
}

function GetWikiData(url){
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      AppendNewElement(data);
      ChangeStyle();
    })
    .catch((err) => {
      throw err;
    })
  }
  
function ChangeStyle(){
  const searchBar = document.querySelector('.search-bar');
  // const search = document.querySelector('.wrapper');
  // change search-bar style when display data
  searchBar.style.display = "block";
  searchItem.style.width = '65%';
  searchBar.style.padding = '20px';
  // change wrapper style as well
}

function AppendNewElement(data){
  const resultList = document.querySelector('#wiki-output');
  let newEls= '';
  for (let i=0; i < data[1].length; ++i) {
    newEls += `<li><a href='${data[3][i]}' target='_blank'>`;
    newEls += `<h4>${data[1][i]}</h4></a>`;
    newEls += `<p>${data[2][i]}</p></li> <hr/>`
  }
  resultList.innerHTML = newEls;
}