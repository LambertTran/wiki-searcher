window.addEventListener("load", function(){
  const btn = document.querySelector('#btn');
  btn.addEventListener('click', function(){
    const searchItem = document.querySelector('#searchItem').value;
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchItem}&limit=10&namespace=0&format=json`;

    GetWikiData(url);
    
  });
})

function GetWikiData(url){
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      AppendNewElement(data);
    })
    .catch((err) => {
      throw err;
    })
  }
  
function AppendNewElement(data){
  const resultList = document.querySelector('#wiki-output');
  let newEls= '';
  for (let i=0; i < data[0].length; ++i) {
    newEls += `<li><a href='${data[3][i]}' target='_blank'>`;
    newEls += `<h5>${data[1][i]}</h5></a>`;
    newEls += `<p>${data[2][i]}</p></li>`
  }
  resultList.innerHTML = newEls;
}