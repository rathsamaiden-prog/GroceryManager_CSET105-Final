import { ListItem } from "./listItem.js";

let list
let listContainer = document.getElementById(`listContainer`)

list = createList()

function createList(){
    let listArr = []
    document.quearySelectorAll(`items`).forEach(item => {
        item.remove()
    });
    let purchasedArr = []
    document.quearySelectorAll(`purchItems`).forEach(item => {
        item.remove()
    });
    let unpurchasedArr = []
    document.quearySelectorAll(`unpurchItems`).forEach(item => {
        item.remove()
    });
    return {
        total: listArr,
        purch: purchasedArr,
        unpurch: unpurchasedArr
    }
}

function addItem(){
    let newItemVal = document.getElementById(`newItemField`).value
    let newItem = document.createElement(`div`) //Temp element
    listContainer.append(newItem)
    newItem.innerHTML = newItemVal
    list.total.push(newItemVal)
    list.unpurch.push(newItemVal)
}

let listItems = document.getElementsByClassName(`listItem`)
let clickTimer = null
listItems.addEventListener(`click`, function(listItem){
    //check for dbl click
    if(clickTimer){
        clearTimeout(clickTimer)
        clickTimer = null
    }else{
        clickTimer = setTimeout(() => {
            clickTimer = null
        }, 250);
    }
    //function code
    if(listItem.innerHTML.includes(`<s>`)) {
        listItem.innerHTML = `${listItem.innerText}`
        list.purch.splice(list.purch.indexOf(listItem.innerText), 1)
        list.unpurch.push(listItem.innerText)
     }
    else{
        listItem.innerHTML = `<s>${listItem.innerText}</s>`
        list.unpurch.splice(list.unpurch.indexOf(listItem.innerText), 1)
        list.purch.push(listItem.innerText)
    }
    return
})

const template = document.getElementById('reenterTemplate');
const clonedContent = template.content.cloneNode(true);
let tempItem
listItems.addEventListener(`dblclick`, function(listItem){
    //check for dbl click
    if(clickTimer){
        clearTimeout(clickTimer)
        clickTimer = null
    }
    //function code
    tempItem = listItem
    document.listItem.replaceWith(clonedContent);
    let inputField = document.getElementById(`inputField`)
    inputField.value = listItem.innerText
})
function commitChange(btn){
    let changeContainer = btn.parentElement()
    let commitItem = document.createElement(`div`)
    commitItem.innerHTML = tempItem.innerHTML
    changeContainer.replaceWith(commitItem)
}