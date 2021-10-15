import React from 'react'

class Emoji extends React.PureComponent {
  render() {
    return (
      <div className='emoji-container'>
        {this.props.emojis.map(i => (
          <div className='emoji-item' key={i.name}>
            <img src={'/img/' + i.url} alt={i.name} title={i.name}
                 onClick={() => this.props.copyImageToClipBoard(i.url, i.name)}
                 onContextMenu={() => this.props.handleClickOnEmoji(i.name)} />
          </div>
        ))}
      </div>
    )
  }
}

export default Emoji
