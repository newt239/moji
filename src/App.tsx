import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import { db } from "./db";
import { isEmptyContent } from "./memoContent";
import Sidebar from "./Sidebar";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 前回のセッションで残った空メモを起動時にまとめて削除する
  useEffect(() => {
    db.memos.toArray().then((memos) => {
      const emptyIds = memos
        .filter((m) => isEmptyContent(m.content))
        .map((m) => m.id);
      if (emptyIds.length > 0) {
        db.memos.bulkDelete(emptyIds);
      }
    });
  }, []);

  return (
    <div className={styles.layout}>
      <header className={styles.appBar}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="メモ一覧を開く"
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </button>
        <span className={styles.appTitle}>Moji</span>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="メモ一覧を閉じる"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
