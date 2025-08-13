import { menuArray } from '/data.js'
const modal = document.getElementById('modal')
const order = document.getElementById('order-container')
const form = document.getElementById('informations')
let orderArray = []

document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        handleAddBtn(e.target.dataset.add)
        renderOrder()
    }
    if (e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove)
        
    }   
    if (e.target.dataset.order){
        renderModal()
    }
})

form.addEventListener('submit', function (e){
    e.preventDefault()
    closeModal()
    renderFinalMessage()
})

function handleAddBtn(itemId){
    const targetItemObj = menuArray.find(item => item.id == itemId)
    if (targetItemObj){
        orderArray.push(targetItemObj)
        renderOrder()

    }  
}

function handleRemoveBtn(itemId){
    const idtoRemove = parseInt(itemId) //convertis itemId en nombre
    const index = orderArray.findIndex(item => item.id === idtoRemove)  //cherche l'index de l'item dans le tableau
   
    if (index !== -1){ // on s'assure que l'item existe bien dans le tableau avant de le supprimer
        orderArray.splice(index, 1) // supprime l'item du tableau
        renderOrder()
    }
}

function getMenuHtml(arr){
    return arr.map(function(menuItems){
        const {logo, name, ingredients, id, price} = menuItems //object destructuring
        return `
            <div class="item-card">
                    <div class="item-visuals-and-details">
                        <img src=${logo} class="menuItemsImg">
                        <div class="item-text-details">
                            <p class="item-name">${name}</p>            
                            <p class="item-description">${ingredients}</p>
                            <p class="item-price">$${price}</p>
                        </div>
                        <img src="img/add-btn.png" class="add-btn" data-add="${id}">
                    </div>
            </div>
                    <hr class="separator">
            `
    }).join('')
}

function renderOrder(){
    let orderHtml = '<h1>Your order</h1>'
    orderArray.forEach(item => {
        orderHtml+= `
        <div class="order-card">
                <div class="order-item-row" id="order-item-row">
                    <p>${item.name}<span class="remove-option" data-remove="${item.id}">remove</span></p>
                    <p class="prix">$${item.price}</p> 
                </div>
            </div>
            `
    })

    const total = orderArray.reduce((sum, item) => sum + item.price, 0)

    orderHtml += `
    <hr class="separator-checkout">
    <div class="order-card">
        <div class="order-item-row">
            <p>Total price:</p> 
            <p class="prix">$${total}</p> 
        </div>
    </div>
    <button class="btn purchase-btn" data-order="modal">Complete order</button>
    `
    document.getElementById('order-container').innerHTML = orderHtml
}

function renderModal(){
    modal.style.display ='flex'
}

function closeModal(){
    modal.style.display = 'none'
}

function renderFinalMessage(){
    let name = document.getElementById('name')
    order.style.display = 'none'
    let final = `<div class="end-container">
        <div class="inner-end-container">
            <p class="final-message">Thanks ${name.value}! Your order is on it's way!</p>
        </div>
    </div>`
    document.getElementById('final').innerHTML = final
}

function render(){
  document.getElementById('menu').innerHTML = getMenuHtml(menuArray)
}

render()