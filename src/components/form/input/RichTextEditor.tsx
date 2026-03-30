import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
// Adjust these CSS classes if needed to match Tailwind styles perfectly

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function RichTextEditor({ value, onChange, placeholder, disabled }: RichTextEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className={`rich-text-container ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <style>{`
        .rich-text-container .quill {
          background-color: transparent;
        }
        .rich-text-container .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: #D1D5DB; /* gray-300 */
        }
        html.dark .rich-text-container .ql-toolbar {
          border-color: #374151; /* gray-700 */
          background-color: rgba(31, 41, 55, 0.5);
        }
        html.dark .rich-text-container .ql-toolbar button, html.dark .rich-text-container .ql-toolbar .ql-picker {
          color: #9CA3AF;
        }
        html.dark .rich-text-container .ql-toolbar .ql-stroke {
          stroke: #9CA3AF;
        }
        html.dark .rich-text-container .ql-toolbar .ql-fill {
          fill: #9CA3AF;
        }
        .rich-text-container .ql-container {
          min-height: 150px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: #D1D5DB; /* gray-300 */
        }
        html.dark .rich-text-container .ql-container {
          border-color: #374151; /* gray-700 */
          color: rgba(255, 255, 255, 0.9);
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        readOnly={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}
