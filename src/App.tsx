import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function App() {
  const editor = useEditor({
    extensions: [StarterKit, CharacterCount],
    content: "<p>Hello World! 🌎️</p>",
  });

  const characterCount = editor?.storage.characterCount.characters();
  const wordCount = editor?.storage.characterCount.words();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Moji - Character Counter</h1>
      <EditorContent editor={editor} />
      <div style={{ marginTop: "1rem" }}>
        <p>Characters: {characterCount}</p>
        <p>Words: {wordCount}</p>
      </div>
    </div>
  );
}

export default App;
