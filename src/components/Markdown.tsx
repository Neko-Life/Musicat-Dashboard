import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import markdownStyle from '@/assets/Markdown.module.css';

export default function Markdown({
  children,
  ...props
}: Parameters<typeof ReactMarkdown>[0]) {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, ...props }) {
          return <code className={markdownStyle.markdownCode} {...props} />;
        },
      }}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
}
