let list = {}
let listContainer
const notepad = document.getElementById(`notepad-container`)
let activeView = `groceryList`

let refreashList = {}

let listTemplate = document.getElementById('listTemplate');
let clonedGroceryList = listTemplate.content.cloneNode(true);
notepad.appendChild(clonedGroceryList)
document.getElementsByTagName(`ul`)[0].id = `groceryList`
createList()

function createList(){
    listContainer = document.getElementById('groceryList')
    list.totalArr = []
    document.querySelectorAll(`items`).forEach(item => {
        item.remove()
    });
    list.purchasedArr = []
    document.querySelectorAll(`purchItems`).forEach(item => {
        item.remove()
    });
    list.unpurchasedArr = []
    document.querySelectorAll(`unpurchItems`).forEach(item => {
        item.remove()
    });
    purchListener()
}
function updateList(listID, listObj){
    let currentList = document.querySelectorAll(listID)
    listContainer = document.getElementById(activeView)
    listObj.forEach(item => {
        currentList.forEach(current => {
            if(item === current) return
        });
        let newItem = document.createElement(`li`)
        if(listID === `groceryList`){
            list.purchasedArr.forEach(purchItem =>{
                if(item === purchItem) item = `<s>${item}</s>`
            })
        }
        newItem.innerHTML = item
        listContainer.append(newItem)
    });
    if(listID === `unpurchList` || listID === `groceryList`) purchListener()
}

function addItem(){
    let newItemVal = document.getElementById(`itemInput`).value
    if(checkValue(newItemVal.toLowerCase())) return
    let newItem = document.createElement(`li`)
    newItem.className = `listItems`
    newItem.innerHTML = newItemVal
    listContainer.appendChild(newItem)
    list.totalArr.push(newItemVal.toLowerCase())
    list.unpurchasedArr.push(newItemVal.toLowerCase())
    document.getElementById(`itemInput`).value = ''
}
function checkValue(newItem){
    if(list.totalArr.includes(newItem)){
        alert(`Item is already included`)
        document.getElementById(`itemInput`).value = ''
        return true
    }
    return false
}

function purchListener(){
    listContainer.addEventListener(`click`, function(event){
        const listItem = event.target.closest(`li`)
        if(listItem.innerHTML.includes(`<s>`)) {
            listItem.innerHTML = `${listItem.innerText}`
            list.purchasedArr.splice(list.purchasedArr.indexOf(listItem.innerText), 1)
            list.unpurchasedArr.push(listItem.innerText.toLowerCase())
        }
        else{
            listItem.innerHTML = `<s>${listItem.innerText}</s>`
            list.unpurchasedArr.splice(list.unpurchasedArr.indexOf(listItem.innerText), 1)
            list.purchasedArr.push(listItem.innerText.toLowerCase())
        }
        return console.log(`${list.totalArr}\n${list.unpurchasedArr}\n${list.purchasedArr}`)
    })
}

let submitBtn = document.getElementById(`submitBtn`)
function switchView(id){
    document.getElementById(activeView).remove()
    let template = document.getElementById('listTemplate');
    let clonedTemplate = template.content.cloneNode(true);  
    notepad.appendChild(clonedTemplate)
    document.getElementsByTagName(`ul`)[0].id = `${id}` 
    activeView = id
    if(id === `purchList`)
        refreashList.purch = updateList(id, list.purchasedArr)
    if(id === `unpurchList`)
        refreashList.unpurch = updateList(id, list.unpurchasedArr)
    if(id === `groceryList`)
        refreashList.total = updateList(`groceryList`, list.totalArr)
    if(id === `purchList` || id === `unpurchList`)
        submitBtn.disabled = true
    else
        submitBtn.disabled = false;
}