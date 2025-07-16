import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // 코드 하이라이트 스타일

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-cert-red prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-cert-red prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-cert-red prose-blockquote:bg-gray-50 prose-blockquote:text-gray-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // GitHub Flavored Markdown 지원 (테이블, 체크박스 등)
        rehypePlugins={[rehypeHighlight]} // 코드 하이라이트
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
