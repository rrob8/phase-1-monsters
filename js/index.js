let allMonsters
let currentPage = 1
document.addEventListener('DOMContentLoaded', fetchMonsters)

function fetchMonsters () {
    page = currentPage
fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
.then((response) => response.json())
.then((monsters)=> {
    displayMonsters(monsters)
    allMonsters = monsters
})
}

const monsterList = document.getElementById('monster-container')
console.log(monsterList)


function displayMonsters (monsters) {
    console.log(monsters)
    monsters.map((monster)=> {
        const monsterUl = document.createElement('ul')
        const name = document.createElement('li')
        const age = document.createElement('li')
        const description = document.createElement('li')

        monsterUl.append(name,age,description)
        monsterList.append(monsterUl)
        name.textContent = monster.name
        age.textContent = monster.age
        description.textContent = monster.description
    })
}

const monsterForm = document.getElementById('monster-form')

monsterForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    createMonster(e)
   
})

function createMonster (e) {
    const monsterName = monsterForm.name.value
    const monsterAge = monsterForm.age.value
    const monsterDescription = monsterForm.description.value

    const monsterObject = {
        name:monsterName,
        age:monsterAge,
        description:monsterDescription
    }

    fetch(`http://localhost:3000/monsters`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(monsterObject)
})
.then(monsterList.textContent = '',
fetchMonsters())
    
}



const next = document.getElementById('forward')
const back = document.getElementById('back')

next.addEventListener('click', nextFiftyMonsters)

function nextFiftyMonsters () {
    currentPage++;
    monsterList.textContent = ''
    fetchMonsters()
}

back.addEventListener('click', previousFifty)
function previousFifty () {
    currentPage--;
    monsterList.textContent = ''
    fetchMonsters()
}