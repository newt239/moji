import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./db";

export default function NewMemoPage() {
  const navigate = useNavigate();
  const created = useRef(false);

  // 空メモを先に作ってから/memo/:idへ移すことで入力中にエディタが作り直されるのを防ぐ
  useEffect(() => {
    if (created.current) return;
    created.current = true;
    const id = crypto.randomUUID();
    const now = Date.now();
    db.memos.put({ id, content: "", createdAt: now, updatedAt: now });
    navigate(`/memo/${id}`, { replace: true });
  }, [navigate]);

  return null;
}
