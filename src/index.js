document.addEventListener('DOMContentLoaded', () => {
showAllDogs();
})

const tableBody = document.getElementById('table-body');
const dogsURL = 'http://localhost:3000/dogs/';

function createRowDog(dog) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${dog.name}</td>
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td>`;

    const td = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit Dog';

    editButton.addEventListener('click', e => editDog(e, dog))
    
    td.append(editButton);
    tr.append(td);
    return tr
}

function appendRowDog(dog) {
    const tr = createRowDog(dog)
    tableBody.append(tr)
    return tr
}

function renderAllDogs(dogsArray) {

    dogsArray.forEach(dog => {
        // debugger
        appendRowDog(dog)});
}

function showAllDogs() {
    tableBody.innerHTML = ""
    fetch(dogsURL)
    .then(resp => resp.json())
    .then(dogsArray => renderAllDogs(dogsArray))
    .catch(error => console.log(error))
};

function editDog(e, dog) {
    e.preventDefault();
    const form = document.getElementById('dog-form');
    form[0].value = dog.name;
    form[1].value = dog.breed;
    form[2].value = dog.sex;

    form.addEventListener('submit', e => updateDog(e, dog))
}

function updateDog(e, dog) {
    e.preventDefault();
   let object = {
   name: e.target[0].value,
   breed: e.target[1].value,
   sex: e.target[2].value
   };
   
   let configObject = {
   method: 'PATCH',
   headers: {
   'Content-Type': 'application/json',
   'Accept': 'application/json'
   },
   body: JSON.stringify(object)
   };
   
   fetch(`${dogsURL}${dog.id}`, configObject)
   .then(resp => resp.json())
   .then(showAllDogs)
   .catch(error => console.log(error));
}
