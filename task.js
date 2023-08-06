//Extract values from input fields of form
const sPriceInput = document.querySelector('#price')
const pNameInput = document.querySelector('#product')
const addBtn = document.querySelector('#submit-btn')
const productList = document.querySelector('#product-list')

//Add event listeners
document.addEventListener('DOMContentLoaded', getProductList)
addBtn.addEventListener('click', addProduct)

//Functions
async function getProductList() {
    try {
        const response = await axios.get("https://crudcrud.com/api/f06d6c8f923f427ea4d5be77f19af584/productList")

        for(let i = 0; i < response.data.length; i++) {
            showProducts(response.data[i])
        }
    } catch (error) {
        console.log(error)
    }
}

function addProduct(event) {
    event.preventDefault()

    //Extract values from input fields
    const sPrice = sPriceInput.value
    const pName = pNameInput.value

    //Create object of product data to be stored on crudcrud
    const prodObj = {
        sPrice,
        pName
    }

    saveToCrudCrud(prodObj)
}

function showProducts(prodObj) {
    //Create product list div
    const productListDiv = document.createElement('div')
    productListDiv.classList.add('product-list-item')
    productListDiv.setAttribute('id', prodObj._id)

    //Create list item for product and price
    const prodLi = document.createElement('li')
    prodLi.classList.add('prodli')
    prodLi.innerText = prodObj.pName

    const priceLi = document.createElement('li')
    priceLi.classList.add('priceli')
    priceLi.innerText = prodObj.sPrice

    //Append above list items to the product list div
    productListDiv.appendChild(prodLi)
    productListDiv.appendChild(priceLi)

    //Create delete Button
    const deleteButton = document.createElement("button")
    deleteButton.innerText = 'Delete Product'
    deleteButton.classList.add("delete-btn")
    productListDiv.appendChild(deleteButton)

    //Add event listener to delete button
    deleteButton.addEventListener('click', (event) => {
        deleteProduct(event, prodObj._id)
    })

    //Append the productListDiv to ul with id = product-list i.e. productList
    productList.appendChild(productListDiv)

    //Clear the input fields of form
    sPriceInput.value = ""
    pNameInput.value = ""
}

async function saveToCrudCrud(prodObj) {
    try {
        const response = await axios.post("https://crudcrud.com/api/f06d6c8f923f427ea4d5be77f19af584/productList", prodObj)
        
        showProducts(response.data)
    } catch (error) {
        console.log(error)
    }
}

async function deleteProduct(event, id) {
    try {
        const response = await axios.delete(`https://crudcrud.com/api/f06d6c8f923f427ea4d5be77f19af584/productList/${id}`)

        //Remove corresponding items from list on screen
        const toRemove = event.target.parentElement
        toRemove.remove()
    } catch (error) {
        console.log(error)
    }
}