import { Box, css } from "@kuma-ui/core";
import { BubbleMenu, EditorProvider, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import "./styles.css";

const extensions = [StarterKit];

const content = "";

const segmenter = new Intl.Segmenter("ja-JP", { granularity: "grapheme" });

const Tiptap = () => {
  const [count, setCount] = useState(0);

  return (
    <Box>
      <Box
        className={css`
          font-size: 3rem;
          text-align: center;
        `}
      >
        {count}
      </Box>
      <EditorProvider
        extensions={extensions}
        content={content}
        onUpdate={(e) => {
          const stringLength = [...segmenter.segment(e.editor.getText())]
            .length;
          setCount(stringLength);
        }}
      >
        <FloatingMenu>This is the floating menu</FloatingMenu>
        <BubbleMenu>This is the bubble menu</BubbleMenu>
      </EditorProvider>
    </Box>
  );
};

export default Tiptap;
