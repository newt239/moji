import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./db";
import MemoEditor from "./MemoEditor";

type LoadedMemo = {
  id: string;
  content: string;
  createdAt: number;
};

export default function MemoPage() {
  const { memoId } = useParams();
  const [loaded, setLoaded] = useState<LoadedMemo | null>(null);

  useEffect(() => {
    if (!memoId) return;
    let cancelled = false;
    db.memos.get(memoId).then((memo) => {
      if (cancelled) return;
      setLoaded({
        id: memoId,
        content: memo?.content ?? "",
        createdAt: memo?.createdAt ?? Date.now(),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [memoId]);

  if (!memoId || loaded?.id !== memoId) {
    return null;
  }

  return (
    <MemoEditor
      key={memoId}
      memoId={memoId}
      initialContent={loaded.content}
      initialCreatedAt={loaded.createdAt}
    />
  );
}
