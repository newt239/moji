import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

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
    <div style={{ padding: "2rem" }}>
      <h1>Moji - Character Counter</h1>
      <EditorContent editor={editor} />
      <div style={{ marginTop: "1rem" }}>
        <p>Characters: {character.length}</p>
        <p>Words: {character.split(" ").length}</p>
      </div>
    </div>
  );
}

export default App;
