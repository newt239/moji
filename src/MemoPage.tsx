import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MemoEditor from "./MemoEditor";
import { db } from "./db";

export default function MemoPage() {
  const { memoId } = useParams();
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    if (!memoId) return;
    db.memos.get(memoId).then((m) => {
      setContent(m?.content ?? "");
    });
  }, [memoId]);

  if (content === null) {
    return null;
  }

  return <MemoEditor memoId={memoId} initialContent={content} />;
}
