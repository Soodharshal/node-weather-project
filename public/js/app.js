// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const form = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    msg1.textContent = 'Loading message .....'
    msg2.textContent = ''
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return msg1.textContent = data.error
            }
            msg1.textContent = data.forecast;
            msg2.textContent = data.location;
        })
    })

})