import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
