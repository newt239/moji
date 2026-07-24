import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./App.module.css";
import { db } from "./db";
import MetricsPanel from "./MetricsPanel";
import { isEmptyContent } from "./memoContent";
import { calculateMetrics } from "./metrics";

type Props = {
  memoId: string;
  initialContent: string;
  initialCreatedAt: number;
  initialUpdatedAt: number;
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
  initialUpdatedAt,
}: Props) {
  const [content, setContent] = useState(initialContent);
  const [plainText, setPlainText] = useState("");
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt);
  const isComposing = useRef(false);
  const savedContent = useRef(initialContent);
  const latestContent = useRef(initialContent);
  latestContent.current = content;

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    autofocus: true,
    onCreate: ({ editor }) => {
      setPlainText(editor.getText({ blockSeparator: "\n" }));
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      setPlainText(editor.getText({ blockSeparator: "\n" }));
    },
  });

  const metrics = useMemo(() => calculateMetrics(plainText), [plainText]);

  useDebouncedEffect(
    () => {
      if (!editor || isComposing.current) return;
      if (content === savedContent.current) return;
      savedContent.current = content;
      const now = Date.now();
      db.memos.put({
        id: memoId,
        content,
        createdAt: initialCreatedAt,
        updatedAt: now,
      });
      setUpdatedAt(now);
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
      <div className={styles.workspace}>
        <div className={styles.editorColumn}>
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
                setPlainText(editor?.getText({ blockSeparator: "\n" }) ?? "");
              }}
            />
          </div>
        </div>
        <MetricsPanel
          metrics={metrics}
          createdAt={initialCreatedAt}
          updatedAt={updatedAt}
        />
      </div>
    </div>
  );
}
