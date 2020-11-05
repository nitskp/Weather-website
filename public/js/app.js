console.log('Client side Javascript file')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading ......'
    messageTwo.textContent = ''
    fetch('http://api.weatherstack.com/current?access_key=26d93632890eeb94198a15ec382fdc6d&query=' + location).then((response) =>{
    response.json().then((data)=>{
       if(data.error){
          messageOne.textContent = 'Wrong Location'
          messageTwo.textContent =''
        }
       else{
           messageOne.textContent = 'Location : ' + data.location.name
           messageTwo.textContent = ' Forecast  : ' + data.current.temperature + ' degrees'
       }
    })
})

})