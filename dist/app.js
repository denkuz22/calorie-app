//Get the UI elements!

const form = document.getElementById('myForm')
const mealInput = document.getElementById('item-name')
const calorieInput = document.getElementById('item-calories')
const mealItemsList = document.getElementById('meal')
const addBtn = document.getElementById('add')
const mealItemsDiv = document.getElementById('item-div')
const totalCal = document.getElementById('span-cal')
const btnDiv = document.querySelector('.button-flex')
const clearBtn = document.querySelector('.clear-all')



loadEventListeners()

//Load my event listeners

//Load event listeners function
function loadEventListeners() {
    //Load DOM
    document.addEventListener('DOMContentLoaded', getFullItemObject)
    //Add a meal
    btnDiv.addEventListener('click', addMeal)
    //Edit meal
    mealItemsDiv.addEventListener('click', editIconEvent)
    //Clear all items
    clearBtn.addEventListener('click', clearAll)
    //Updating elements
    document.querySelector('.button-flex').addEventListener('click', updateItem)
    //Delete elements
    document.querySelector('.button-flex').addEventListener('click', deleteItem)

}

//Add a meal and save it to LS
function addMeal(e) {
    if (e.target.className === 'button-flex-1') {
        if (mealInput.value === '' || calorieInput.value == 0) {
            alert('Please fill out all the fields!')
        } else {
            console.log(mealInput.value)
            const generate = new IDGenerator()
            const id = generate.generate()

            console.log(id)

            //Create div element for the whole line
            const item_div = document.createElement('div')
            item_div.className = 'full-line'
            //item_div.setAttribute('value', id)
            mealItemsDiv.appendChild(item_div)

            //Create a div element for meal item
            const meal_div = document.createElement('div')
            meal_div.className = `meal-div`
            //meal_div.setAttribute('value', id)
            const meal = mealInput.value.charAt(0).toUpperCase() + mealInput.value.slice(1)
            meal_div.appendChild(document.createTextNode(meal))
            item_div.appendChild(meal_div)

            //Create a div elemet for calorie
            const calorie_div = document.createElement('div')
            calorie_div.className = 'calorie-div'
            //calorie_div.setAttribute('value', id)
            calorie_div.appendChild(document.createTextNode(calorieInput.value))
            item_div.appendChild(calorie_div)

            //Create a dib element for icon
            const icon_div = document.createElement('a')
            icon_div.className = 'icon-elem'
            icon_div.innerHTML = `<i value=${id} id='icon-id' class='icon-edit fa fa-edit'></i>`
            item_div.appendChild(icon_div)



            const meal_obj = {
                item_id: id,
                item: mealInput.value,
                calorie: calorieInput.value
            }

            storeInLocalStorage(meal_obj)
            totalCal.innerText = totalCalorie()

            //Clear the inputs
            mealInput.value = ''
            calorieInput.value = ''
            console.log(e.target)

            e.preventDefault()
        }

    }

}

function totalCalorie() {
    let total = 0
    let meals = JSON.parse(localStorage.getItem('meals'))

    meals.forEach(meal => {
        const new_cal = parseInt(meal.calorie)
        total += new_cal;
    })
    console.log(total)
    return total
}

function editIconEvent(e) {
    if (e.target.classList.contains('icon-edit')) {
        console.log('Yes')
        const another_value = e.target.getAttribute('value')
        console.log(another_value)
        btnDiv.innerHTML = `
        <button value=${another_value} class="button-update"><i class="fa fa-pencil"></i> Update</button>
        <button value=${another_value} class="button-delete"><i class="fa fa-trash"></i> Delete</button>
        `
        const parentDiv = e.target.parentElement.parentElement
        console.log(parentDiv.children[0])
        mealInput.value = parentDiv.children[0].textContent
        calorieInput.value = parseInt(parentDiv.children[1].textContent)

    }

}


function updateInLocalStorage(id, e) {
    //console.log(e)
    let meals = JSON.parse(localStorage.getItem('meals'))
    if (e.className === 'button-update') {
        meals.forEach(function (meal, index) {
            if (id === meal.item_id) {
                meals.splice(index, 1, {
                    item_id: id,
                    item: mealInput.value,
                    calorie: calorieInput.value
                })
            }
        })
        console.log(meals)
        mealInput.value = ''
        calorieInput.value = ''
        btnDiv.innerHTML = `
        <button id='add' class="button-flex-1"><i class="fa fa-plus"></i>
                        Add
                        Meal</button>
        `
        localStorage.setItem('meals', JSON.stringify(meals));
        mealItemsDiv.innerHTML = ''

        getFullItemObject()

    }

}

function updateItem(e) {
    event = e.target
    //console.log(event)
    val = event.getAttribute('value')
    //console.log(val)
    updateInLocalStorage(val, event)

}

function deleteItem(e) {
    event = e.target
    //console.log(event)
    val = event.getAttribute('value')
    //console.log(val)
    deleteInLocalStorage(val, event)

}



function deleteInLocalStorage(id, e) {
    let meals = JSON.parse(localStorage.getItem('meals'))
    if (e.className === 'button-delete') {
        meals.forEach(function (meal, index) {
            if (id === meal.item_id) {
                meals.splice(index, 1)
            }
        })
        console.log(meals)
        mealInput.value = ''
        calorieInput.value = ''
        btnDiv.innerHTML = `
        <button id='add' class="button-flex-1"><i class="fa fa-plus"></i>
                        Add
                        Meal</button>
        `
        localStorage.setItem('meals', JSON.stringify(meals));
        mealItemsDiv.innerHTML = ''

        getFullItemObject()



    }

}

function clearAll() {
    mealItemsDiv.innerHTML = ''
    localStorage.clear()
    totalCal.innerText = 0
}

function getFullItemObject() {
    let meals
    if (localStorage.getItem('meals') === null) {
        meals = []
    } else {
        meals = JSON.parse(localStorage.getItem('meals'))
    }

    //Loop here
    meals.forEach(meal_item => {
        console.log(mealInput.value)
        const id = meal_item.item_id
        //Create div element for the whole line
        const item_div = document.createElement('div')
        item_div.className = 'full-line'
        //item_div.setAttribute('value', id)
        mealItemsDiv.appendChild(item_div)

        //Create a div element for meal item
        const meal_div = document.createElement('div')
        meal_div.className = 'meal-div'
        //meal_div.setAttribute('value', id)
        const meal = meal_item.item.charAt(0).toUpperCase() + meal_item.item.slice(1)
        meal_div.appendChild(document.createTextNode(meal))
        item_div.appendChild(meal_div)

        //Create a div elemet for calorie
        const calorie_div = document.createElement('div')
        calorie_div.className = 'calorie-div'
        //calorie_div.setAttribute('value', id)
        calorie_div.appendChild(document.createTextNode(meal_item.calorie))
        item_div.appendChild(calorie_div)

        //Create a dib element for icon
        const icon_div = document.createElement('a')
        icon_div.className = 'icon-elem'
        icon_div.innerHTML = `<i value=${id} id='icon-id' class='icon-edit fa fa-edit'></i>`
        item_div.appendChild(icon_div)

        //Get the total
        totalCal.innerText = totalCalorie()
    })

}

function storeInLocalStorage(fullItem) {
    let meals
    if (localStorage.getItem('meals') === null) {
        meals = []
    } else {
        meals = JSON.parse(localStorage.getItem('meals'))
    }

    meals.push(fullItem)

    localStorage.setItem('meals', JSON.stringify(meals))
}



//ID Generator
class IDGenerator {
    constructor() {
        this.length = 5
        this.timestamp = +new Date
        var _getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
        this.generate = function () {
            var ts = this.timestamp.toString()
            var parts = ts.split("").reverse()
            var id = ""
            for (var i = 0; i < this.length; ++i) {
                var index = _getRandomInt(0, parts.length - 1)
                id += parts[index]
            }
            return id
        }
    }
}