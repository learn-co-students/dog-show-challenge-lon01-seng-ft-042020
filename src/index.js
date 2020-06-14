document.addEventListener('DOMContentLoaded', () => {
const table = document.querySelector('#table-body')
const editForm = document.querySelector('#dog-form')

// --------------------------------------------------
// Get all the dogs 
// --------------------------------------------------

const getDogs = () => {
fetch('http://localhost:3000/dogs')
.then(resp => resp.json())
.then(dogs => renderDogs(dogs))
.catch(error => console.log(error.message))
}

const renderDogs = (dogs) => {
    dogs.forEach(dog => {
        renderDog(dog)
    });
}

const renderDog = (dog) => {
    const row = document.createElement('tr');
    row.className = "padding center"

    const name = document.createElement('td');
    name.innerText = dog.name
    name.className = "padding center"

    const breed = document.createElement('td');
    breed.innerText = dog.breed
    breed.className = "padding center"

    const sex = document.createElement('td');
    sex.innerText = dog.sex
    sex.className = "padding center"

    const editButton = document.createElement('button');
    editButton.innerText = "Edit Dog"
    editButton.className = "padding center"
    editButton.addEventListener('click', e => editDog(e, dog));

    row.append(name, breed, sex, editButton)
    table.append(row)
}

// --------------------------------------------------
// Edit each dog 
// --------------------------------------------------

const editDog = (e, dog) => {
    e.preventDefault();
    editForm[0].value = dog.name;
    editForm[1].value = dog.breed;
    editForm[2].value = dog.sex;

    editForm.addEventListener('submit', e => updateDog(e, dog))
}

const updateDog = (e, dog) => {
    e.preventDefault()

    let configObject = {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
        },
        body: JSON.stringify({
        name: e.target[0].value,
        breed: e.target[1].value,
        sex: e.target[2].value,
        })
        };

        fetch(`http://localhost:3000/dogs/${dog.id}`, configObject)
        .then(resp => resp.json())
        .then(getDogs)

        editForm.reset()
}

getDogs()
})