const https = require('https'),
  Stream = require('stream').Transform,
  fs = require('fs')

const files = require('./data.json')

function downloadFile({ name, url }) {
  https.request(url, function(response) {
    const fileName = url.substring(url.lastIndexOf('/')+1);
    const ext = fileName.split('.').pop()
    const data = new Stream()

    response.on('data', function(chunk) {
      data.push(chunk)
    })

    response.on('end', function() {
      fs.writeFileSync(`./img/${name}.${ext}`, data.read())
    });
  }).end()
}

async function main() {
  for (const file of files) {
    downloadFile(file)
    console.log(`Started downloading ${file.name}`)
    await sleep(100)
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms))
}

void main()

// console.log(files.length) 451
// ls | wc -l