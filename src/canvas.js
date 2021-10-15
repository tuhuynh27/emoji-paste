function setCanvasImage(path, func) {
  const img = new Image
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')

  img.onload = function() {
    c.width = this.naturalWidth
    c.height = this.naturalHeight
    ctx.drawImage(this,0,0)
    c.toBlob(blob => {
      func(blob)
    },'image/png')
  }
  img.src = path
}

export function copyImageToClipboardUtil(url) {
  setCanvasImage(url,(imgBlob) => {
    navigator.clipboard.write(
      [
        new ClipboardItem({ 'image/png': imgBlob })
      ]
    )
      .then(() => { })
      .catch(e =>{ console.log(e) })
  })
}
