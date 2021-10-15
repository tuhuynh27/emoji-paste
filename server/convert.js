// Example run: node convert.js /Users/tu.huynh/Desktop/Side/emoji-paste/server/img

const fs = require('fs')
const process = require('process')
const path = require('path')
const glob = require('glob')


const dir = process.argv[2]

const input_path = path.join(dir, '**', '*.png')
const output_path = path.join(dir, 'min')

const sharp = require('sharp')

glob(input_path, function (err, files) {
  if (err != null) { throw err }
  fs.mkdirSync(output_path, { recursive: true })
  files.forEach(function(inputFile) {
    sharp(inputFile)
      .png()
      .toFile(path.join(output_path, path.basename(inputFile, path.extname(inputFile))+'.png'), (err, info) => {
        if (err === null) {
          fs.unlink(inputFile, (err2) => {
            if (err2) throw err2
            console.log('successfully compressed and deleted '+inputFile);
          })
        } else { throw err }
      })
  })
})
