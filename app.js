const input=document.querySelector('input')
const root=document.querySelector('#root')
const detail=document.querySelector('.detail')
const btns=document.querySelectorAll('button')
const random=document.querySelector('#random')

const url='https://www.themealdb.com/api/json/v1/1/search.php?s='
const letterUrl='https://www.themealdb.com/api/json/v1/1/search.php?f='
const randomUrl='https://www.themealdb.com/api/json/v1/1/random.php'
const idUrl='https://www.themealdb.com/api/json/v1/1/lookup.php?i='

function getMeals(){
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.meals);
        showMeals(data.meals.slice(0,3))
    })
    
}

function getMeal(name){
    fetch(url+name)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.meals);
        showMeals(data.meals)
    })
    
} 

input.onchange=()=>{
    detail.innerHTML=''
    root.innerHTML=''
    getMeal(input.value)
}

function getOneMeal(id){
    fetch(idUrl+id)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.meals[0]);
            showOneMeal(data.meals[0])
    })
}

function showMeals(arr){
    detail.innerHTML=''
    root.innerHTML=''
    for (const obj of arr) {
        root.innerHTML+=`
        <div class="card" style="width: 18rem;"
         onclick= "getOneMeal(${obj.idMeal})">
            <img src="${obj.strMealThumb}" class="card-img-top" alt="..."/>
            <div class="card-body">
                <h2 class="card-text">${obj.strMeal}</h2>
            </div>
         </div>
        `        
    }
}
getMeals()

function showOneMeal(obj){
    let ingredientList=''
    for(i=0;i<21; i++){
        console.log(i);
        const ingredient=obj['strIngredient' +i]
        const mesure=obj['strMeasure' +i]
        console.log(mesure);
        console.log(ingredient);
        if(ingredient){
            ingredientList+=`
            <img src='https://www.themealdb.com/images/ingredients/${ingredient}-Small.png'/>
            <li>${mesure} ${ingredient}</li>`
            console.log(ingredientList);
        }
    }

    root.innerHTML=''
    detail.innerHTML=`
    <div>
        <div>
             <img src='${obj.strMealThumb}'/>
             <h1>${obj.strMeal}</h1>
             <p>${obj.strInstructions}</p>
             <ol>${ingredientList}</ol>
        </div>
    </div>
    `
}

btns.forEach(btn=>{
    detail.innerHTML=''
    root.innerHTML=''
    btn.onclick=()=>{
        console.log(letterUrl+btn.innerText);

        fetch(letterUrl+btn.innerText)
            .then(res=>res.json())
            .then(data=>{
                console.log(data.meals);
                showMeals(data.meals)
            })
    }
})

function getRandomMeal(){
    fetch(randomUrl)
       .then(res=>res.json())
       .then(data=>{
          console.log(data.meals);
          showMeals(data.meals)
       })
}

random.onclick=()=>{
    detail.innerHTML=''
    root.innerHTML=''
    getRandomMeal()
}