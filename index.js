const input = document.querySelector('.input');
const btn = document.querySelector('#save-btn');
const delBtn = document.querySelector('#del-btn');
const tabBtn = document.querySelector('#tab-btn');

const list = document.getElementById('list');
let items = localStorage.getItem("items");
if(localStorage.getItem("items")) {
   items = items.split(',');
}
else
    items = [];


window.addEventListener('load', updateDom);

btn.addEventListener('click', () => {
    if(input.value.length >= 1) {
       items.push(input.value);
       input.value = "";
       window.localStorage.setItem("items",items);
       updateDom();
    }
})

delBtn.addEventListener('click', () => {
    localStorage.clear();
})


tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let tab = tabs[0];
        items.push(tab.url);
        localStorage.setItem("items",items);
        updateDom();
    })
})

function updateDom() {
    let itemList = "";
    items.forEach((el) => {
        itemList = `<li><a href = #${el} target = '_blank'>${el}</a></li>` + itemList;
    })
    list.innerHTML = itemList;
}



