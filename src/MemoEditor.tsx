import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./db";
import styles from "./App.module.css";

interface Props {
  memoId?: string;
  initialContent?: string;
  onCreate?: (id: string) => void;
}

function useDebouncedEffect(fn: () => void, deps: unknown[], delay: number) {
  useEffect(() => {
    const handle = setTimeout(fn, delay);
    return () => clearTimeout(handle);
  }, [...deps, delay]);
}

export default function MemoEditor({
  memoId,
  initialContent = "",
  onCreate,
}: Props) {
  const navigate = useNavigate();
  const [id, setId] = useState<string | undefined>(memoId);
  const [content, setContent] = useState(initialContent);
  const isComposing = useRef(false);

  const editor = useEditor({
    extensions: [StarterKit, CharacterCount],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
  });

  useDebouncedEffect(
    () => {
      if (!editor || isComposing.current) return;
      const now = Date.now();
      if (!id) {
        const newId = crypto.randomUUID();
        setId(newId);
        db.memos.put({ id: newId, content, createdAt: now, updatedAt: now });
        onCreate?.(newId);
        navigate(`/memo/${newId}`, { replace: true });
      } else {
        db.memos.put({ id, content, createdAt: now, updatedAt: now });
      }
    },
    [content, id],
    500,
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Moji - Character Counter</h1>
      <div className={styles.editorContainer}>
        <EditorContent
          editor={editor}
          className={styles.editorContent}
          onCompositionStart={() => {
            isComposing.current = true;
          }}
          onCompositionEnd={() => {
            isComposing.current = false;
            setContent(editor?.getHTML() ?? "");
          }}
        />
      </div>
      <div className={styles.stats}>
        <p className={styles.statItem}>
          Characters: {editor?.storage.characterCount.characters()}
        </p>
        <p className={styles.statItem}>
          Words: {editor?.storage.characterCount.words()}
        </p>
      </div>
    </div>
  );
}
