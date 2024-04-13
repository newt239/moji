import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'

// define your extension array
const extensions = [
  StarterKit,
]

const content = '<p>Hello World!</p>'

const segmenter = new Intl.Segmenter("ja-JP", { granularity: "grapheme" })

const Tiptap = () => {
  const [count, setCount] = useState(0);

  return (
    <>
    <p>{count}</p>
    <EditorProvider extensions={extensions} content={content} onUpdate={(e) => {
      const stringLength = [...segmenter.segment(e.editor.getText())].length;
      setCount(stringLength);
    }}>
      <FloatingMenu>This is the floating menu</FloatingMenu>
      <BubbleMenu>This is the bubble menu</BubbleMenu>
    </EditorProvider>
  </>
  )
}

export default Tiptap;