import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { liveQuery } from "dexie";
import { db } from "./db";
import type { Memo } from "./db";
import styles from "./App.module.css";

function extractTitle(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || "";
  return text.trim().slice(0, 20) || "(no content)";
}

export default function Sidebar() {
  const location = useLocation();
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    const sub = liveQuery(() =>
      db.memos.orderBy("updatedAt").reverse().toArray(),
    ).subscribe({ next: setMemos });
    return () => sub.unsubscribe();
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.memoList}>
        {memos.map((m) => (
          <Link
            key={m.id}
            to={`/memo/${m.id}`}
            className={`${styles.memoCard} ${
              location.pathname === `/memo/${m.id}` ? styles.memoCardActive : ""
            }`}
          >
            <div>{extractTitle(m.content)}</div>
            <small>{new Date(m.updatedAt).toLocaleString()}</small>
          </Link>
        ))}
      </div>
      <Link to="/new" className={styles.newButton}>
        + New
      </Link>
    </div>
  );
}
