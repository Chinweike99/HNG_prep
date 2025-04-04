import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

interface PostRendererProps {
  data: any;
}

const PostRenderer = ({ data }: PostRendererProps) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current && data) {
      const editor = new EditorJS({
        holder: 'post-viewer',
        data: data,
        readOnly: true,
        tools: {},
      });
      
      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [data]);

  return <div id="post-viewer" className="prose max-w-none" />;
};

export default PostRenderer;