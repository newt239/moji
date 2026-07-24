import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { db } from "./db";
import { isEmptyContent } from "./memoContent";

type Props = {
  memoId: string;
  initialContent: string;
  initialCreatedAt: number;
};

function useDebouncedEffect(fn: () => void, deps: unknown[], delay: number) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    const handle = setTimeout(() => fnRef.current(), delay);
    return () => clearTimeout(handle);
  }, [...deps, delay]);
}

export default function MemoEditor({
  memoId,
  initialContent,
  initialCreatedAt,
}: Props) {
  const [content, setContent] = useState(initialContent);
  const [stats, setStats] = useState({ characters: 0, words: 0 });
  const isComposing = useRef(false);
  const savedContent = useRef(initialContent);
  const latestContent = useRef(initialContent);
  latestContent.current = content;

  const editor = useEditor({
    extensions: [StarterKit, CharacterCount],
    content: initialContent,
    autofocus: true,
    onCreate: ({ editor }) => {
      setStats({
        characters: editor.storage.characterCount.characters({
          node: editor.state.doc,
        }),
        words: editor.storage.characterCount.words({ node: editor.state.doc }),
      });
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      setStats({
        characters: editor.storage.characterCount.characters({
          node: editor.state.doc,
        }),
        words: editor.storage.characterCount.words({ node: editor.state.doc }),
      });
    },
  });

  useDebouncedEffect(
    () => {
      if (!editor || isComposing.current) return;
      if (content === savedContent.current) return;
      savedContent.current = content;
      db.memos.put({
        id: memoId,
        content,
        createdAt: initialCreatedAt,
        updatedAt: Date.now(),
      });
    },
    [content, memoId, initialCreatedAt],
    500,
  );

  // 本文が空のままエディタを離れたメモをDBに残さないためアンマウント時に削除する
  useEffect(() => {
    return () => {
      if (isEmptyContent(latestContent.current)) {
        db.memos.delete(memoId);
      }
    };
  }, [memoId]);

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
        <p className={styles.statItem}>Characters: {stats.characters}</p>
        <p className={styles.statItem}>Words: {stats.words}</p>
      </div>
    </div>
  );
}
