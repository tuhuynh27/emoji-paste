import React from 'react'

class Emoji extends React.PureComponent {
  handleClick = (e, name) => {
    if (this.props.handleClickOnEmoji) this.props.handleClickOnEmoji(name)
  }

  copyImageToClipBoard = async (url, name) => {
    if (!url.endsWith('.gif')) {
      const resp = await fetch('/img/' + url)
      const blob = await resp.blob()
      await navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })])
    } else {
      window.open('/img/' + url)
    }
    if (this.props.handleClickOnEmoji) this.props.handleClickOnEmoji(name)
  }

  render() {
    return (
      <div className='emoji-container'>
        {this.props.emojis.map(i => (
          <div className='emoji-item' key={i.name}>
            <img src={'/img/' + i.url} alt={i.name} title={i.name}
                 onClick={() => this.copyImageToClipBoard(i.url, i.name)}
                 onContextMenu={(e) => this.handleClick(e, i.name)} />
          </div>
        ))}
      </div>
    )
  }
}

export default Emoji
