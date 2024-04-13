import type { MetaFunction } from "@remix-run/node";
import Tiptap from "components/Tiptap";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Moji Counter</h1>
      <Tiptap />
    </div>
  );
}
