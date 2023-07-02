import React from 'react'
import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'

export default function StudyNode() {
  const mdEditor = React.useRef(null)
  const [value, setValue] = React.useState('xxx')

  const handleClick = () => {
    if (mdEditor.current) {
      alert(mdEditor.current.getMdValue())
    }
  }

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, '')
    console.log(newValue)
    setValue(newValue)
  }

  return (
    <div className="App">
      <button onClick={handleClick}>Get value</button>
      <Editor
        ref={mdEditor}
        value={value}
        style={{
          height: '500px'
        }}
        onChange={handleEditorChange}
        renderHTML={(text) => <ReactMarkdown source={text} />}
      />
    </div>
  )
}
