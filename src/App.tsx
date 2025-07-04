import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [character, setCharacter] = useState("Hello World! 🌎️");
  const editor = useEditor({
    extensions: [StarterKit, CharacterCount],
    content: character,
    onUpdate: ({ editor }) => {
      setCharacter(editor.getText());
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Moji - Character Counter</h1>
      <div className={styles.editorContainer}>
        <EditorContent editor={editor} className={styles.editorContent} />
      </div>
      <div className={styles.stats}>
        <p className={styles.statItem}>Characters: {character.length}</p>
        <p className={styles.statItem}>Words: {character.split(" ").length}</p>
      </div>
    </div>
  );
}

export default App;
