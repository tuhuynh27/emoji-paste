import React from 'react'

import Emoji from './Emoji'

import emojis from './data.json'

const utilizeFocus = () => {
  const ref = React.createRef()
  const setFocus = () => {ref.current &&  ref.current.focus()}

  return {setFocus, ref}
}

class App extends React.Component {
  inputFocus = utilizeFocus()

  state = {
    showSnackbar: false,
    input: '',
    recentlyUse: localStorage.getItem('recentlyUse') ? localStorage.getItem('recentlyUse').split(',') : []
  }

  inputChange = e => {
    this.setState({
      input: e.target.value
    })
  }

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      if (this.state.input.toLowerCase() === 'clear') {
        this.clearRecentlyUse()
      } else {
        const searchResult = this.getEmojis()
        if (searchResult.length) {
          void this.copyImageToClipBoard(searchResult[0].url, searchResult[0].name)
        }
      }
    }
  }

  getEmojis = () => {
    return emojis.filter(e => e.name.includes(this.state.input))
  }

  getRecentlyUseEmoji = () => {
    return this.state.recentlyUse.map(e => ({
      name: e,
      url: emojis.find(f => f.name === e).url
    })).reverse()
  }

  handleClickOnEmoji = name => {
    this.setState(prevState => ({
      recentlyUse: this.addRecentlyUse(prevState, name)
    }), () => {
      localStorage.setItem('recentlyUse', this.state.recentlyUse.toString())
    })

    this.setState({
      showSnackbar: true
    }, () => {
      setTimeout(() => this.setState({ showSnackbar: false }), 1000)
    })
  }

  copyImageToClipBoard = async (url, name) => {
    if (!url.endsWith('.gif')) {
      const resp = await fetch('/img/' + url)
      const blob = await resp.blob()
      await navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })])
    } else {
      window.open('/img/' + url)
    }
    this.handleClickOnEmoji(name)
  }

  addRecentlyUse = (state, name) => {
    const arr = state.recentlyUse.slice()
    const found = arr.findIndex(e => e === name)
    if (found !== -1) {
      arr.splice(found, 1)
    }
    arr.push(name)
    return arr
  }

  clearRecentlyUse = () => {
    this.setState({
      input: '',
      recentlyUse: []
    })
    localStorage.setItem('recentlyUse', '')
  }

  componentDidMount() {
    this.inputFocus.setFocus()

    document.onkeypress =  (e) => {
      const formElements = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
      if (!formElements.includes(e.target.tagName)) {
        this.inputFocus.setFocus()
      }
    }
  }

  render() {
    return (
      <>
        {this.state.showSnackbar && <div className='snackbar'>
          Copied to clipboard!
        </div>}
        <div className='page-container'>
          <h1>Emoji Paste <a href='https://github.com/tuhuynh27/emoji-paste' target='_blank' rel='noreferrer'>
            <img alt='Github' src='/icon/github.png' style={{ width: '25px' }}/></a></h1>

          <div className='search-container'>
            <input type='search' value={this.state.input}
                   onChange={this.inputChange} onKeyDown={this.handleKeyDown}
                   ref={this.inputFocus.ref}
                   placeholder={this.state.recentlyUse.length ? `Type 'clear' to clear recent list` : 'Search emojis'} />
            {this.state.input === 'clear' && <button onClick={this.clearRecentlyUse}>Remove recently use</button>}
          </div>

          <Emoji emojis={this.getRecentlyUseEmoji()} copyImageToClipBoard={this.copyImageToClipBoard} handleClickOnEmoji={this.handleClickOnEmoji} />

          <Emoji emojis={this.getEmojis()} copyImageToClipBoard={this.copyImageToClipBoard} handleClickOnEmoji={this.handleClickOnEmoji} />
        </div>
      </>
    );
  }
}

export default App
