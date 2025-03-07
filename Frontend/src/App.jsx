import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript"; // Add language-specific components
import "prismjs/components/prism-python";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import axios from "axios";


export default function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  async function reviewCode(){
   const response = await axios.post("http://localhost:3000/ai/get-review",{code})
   setReview(response.data)
  }

  const highlightCode = (code) => {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  };

  

  return (
    <main className="container">
      <section className="code-input">
        <Editor
          value={code}
          onValueChange={code =>setCode(code)}
          highlight={highlightCode}
          padding={10}
          className="code-editor"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            border: "1px solid #ddd",
            borderRadius: "5px",
            height:"100%",
            width:"100%",
            color:"white",
            caretColor:"white",

          }}
        />
        <button className="review-btn" onClick={reviewCode}>
          Review Your Code
        </button>
      </section>
      <div className="code-review">
        <Markdown
        rehypePlugins={rehypeHighlight}>
          {review}</Markdown>
      </div>
    </main>
  );
}
