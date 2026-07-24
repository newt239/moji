import { liveQuery } from "dexie";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import type { Memo } from "./db";
import { db } from "./db";
import { extractText, isEmptyContent } from "./memoContent";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props) {
  const location = useLocation();
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    const sub = liveQuery(() =>
      db.memos.orderBy("updatedAt").reverse().toArray(),
    ).subscribe({ next: setMemos });
    return () => sub.unsubscribe();
  }, []);

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`.trim()}
    >
      <div className={styles.memoList}>
        {memos
          .filter((m) => !isEmptyContent(m.content))
          .map((m) => (
            <Link
              key={m.id}
              to={`/memo/${m.id}`}
              onClick={onClose}
              className={`${styles.memoCard} ${
                location.pathname === `/memo/${m.id}`
                  ? styles.memoCardActive
                  : ""
              }`}
            >
              <div>{extractText(m.content).slice(0, 20)}</div>
              <small>{new Date(m.updatedAt).toLocaleString()}</small>
            </Link>
          ))}
      </div>
      <Link to="/new" onClick={onClose} className={styles.newButton}>
        + New
      </Link>
    </div>
  );
}
