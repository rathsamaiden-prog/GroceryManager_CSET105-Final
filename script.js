let list
let listContainer = document.getElementById(`listContainer`)

list = createList()

function createList(){
    let listArr = []
    // document.quearySelectorAll(`items`).forEach(item => {
    //     item.remove()
    // });
    let purchasedArr = []
    // document.quearySelectorAll(`purchItems`).forEach(item => {
    //     item.remove()
    // });
    let unpurchasedArr = []
    // document.quearySelectorAll(`unpurchItems`).forEach(item => {
    //     item.remove()
    // });
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
listItems.addEventListener(`click`, function(listItem){
    if(listItem.innerHTML.includes(`<s>`)) return listItem.innerHTML = `${listItem.innerText}`
    else return listItem.innerHTML = `<s>${listItem.innerText}</s>`
})

const template = document.getElementById('reenterTemplate');
const clonedContent = template.content.cloneNode(true);
let tempItem
listItems.addEventListener(`dblclick`, function(listItem){
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