// "use client";

// import { useEffect, useRef } from 'react';
// import EditorJS, { OutputData } from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import Code from '@editorjs/code';
// import InlineCode from '@editorjs/inline-code';
// import LinkTool from '@editorjs/link';
// import ImageTool from '@editorjs/image';
// import type { ToolConstructable } from '@editorjs/editorjs';


// interface EditorProps {
//     data?: OutputData;
//     onChange: (data: OutputData) => void;
//     holder: string;
// }

// const Editor = ({data, onChange, holder} : EditorProps) =>{
//     const editorRef = useRef<EditorJS | null>(null);
    
//     useEffect(() => {
//         if(!editorRef.current){
//             initEditor();
//         }
//         return () => {
//             if(editorRef.current && editorRef.current.destroy){
//                 editorRef.current.destroy();
//             }
//         };
//     }, [])

//     const initEditor = () =>{
//         const editor = new EditorJS({
//             holder: holder,
//             tools: {
//                 header: {
//                     class: Header as unknown as ToolConstructable,
//                     config: {
//                         placeholder: "Enter a header",
//                         levels: [1, 2, 3, 4, 5],
//                         defaultLevel: 2
//                     }
//                 },
//                 list: {
//                     class: List,
//                     inlineToolbar: true,
//                 },
//                 code: Code,
//                 inlineCode: InlineCode,
//                 LinkTool: LinkTool,
//                 image: {
//                     class: ImageTool,
//                     config: {
//                         endpoints: {
//                             byFile: '/api/upload-image',
//                             byUrl: '/api/fetch-url'
//                         }
//                     }
//                 }
//             },
//             data: data || { blocks: [] },
//             async onChange(api){
//                 const output = await api.saver.save();
//                 onChange(output);
//             },
//             placeholder: "Start writing your blog posts...",
//         });
//         editorRef.current = editor;
//     }

//  return <div id={holder} className=' w-full  border-1  pl-16 ' />
// }

// export default Editor;


"use client";

import { useEffect, useRef, useState } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import ImageTool from '@editorjs/image';
import type { ToolConstructable } from '@editorjs/editorjs';

interface EditorProps {
  data?: OutputData;
  onChange: (data: OutputData) => void;
  holder: string;
}

const Editor = ({ data, onChange, holder }: EditorProps) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [isClient, setIsClient] = useState(false); // State to track client-side rendering

  useEffect(() => {
    setIsClient(true); // Set to true after the component is mounted on the client
  }, []);

  useEffect(() => {
    if (isClient && !editorRef.current) {
      initEditor();
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, [isClient]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: holder,
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 2,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        code: Code,
        inlineCode: InlineCode,
        LinkTool: LinkTool,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: '/api/upload-image',
              byUrl: '/api/fetch-url',
            },
          },
        },
      },
      data: data || { blocks: [] },
      async onChange(api) {
        const output = await api.saver.save();
        onChange(output);
      },
      placeholder: 'Start writing your blog posts...',
    });

    editorRef.current = editor;
  };

  if (!isClient) {
    return null; // Return nothing during SSR (server-side rendering)
  }

  return <div id={holder} className="w-full border-1 pl-16" />;
};

export default Editor;
