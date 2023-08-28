const LLAMA_CPP_API = window.LLAMA_CPP_API
const dialog = document.querySelector('dialog')
const dialogTextarea = dialog.querySelector('textarea')

const form = document.querySelector('form')
const submitButton = document.querySelector('form button')

submitButton.addEventListener('click', async e => {
  e.preventDefault()

  // Collect form input
  const prompt = form.querySelector('#base-prompt').value
  const temperature = form.querySelector('#model-temperature').value
  const instructions = form.querySelector('#additional-instructions').value

  // Loading state
  submitButton.setAttribute('disabled', 'disabled')
  submitButton.innerHTML = 'Please wait ...'

  // Request
  try {
    let composedPrompt = `This is a conversation between user and lil-vector, a friendly chatbot. `
    composedPrompt += `Respond in simple text to the question you are asked by the user.\n\n `
    composedPrompt += `User: ${prompt}\n${instructions}\nlil-vector:`

    const response = await fetch(LLAMA_CPP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "stream": false,
          "temperature": Number(temperature),
          "repeat_penalty": 1.20,
          "grammar": "",
          "prompt": composedPrompt
      })
    })

    const data = await response.json()
    dialogTextarea.value = data.content.trim()
    dialog.showModal()
    dialogTextarea.scrollTo({top: 0})

  } catch(err) {
    console.trace(err)
  }

  submitButton.removeAttribute('disabled')
  submitButton.innerHTML = 'Cheers !'
})