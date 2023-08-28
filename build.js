const fs = require('fs')

const input = fs.readFileSync('src/index.html').toString()
const output =  input.replace('{{ LLAMA_CPP_API }}', process.env.LLAMA_CPP_API)

fs.writeFileSync('public/index.html', output)
