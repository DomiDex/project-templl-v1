import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { EditorToolbar } from './EditorToolbar';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  label = 'Description',
  placeholder = 'Write your content in markdown...',
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    // Check if selection is already wrapped with the formatting
    const beforeText = value.substring(
      Math.max(0, start - before.length),
      start
    );
    const afterText = value.substring(
      end,
      Math.min(value.length, end + after.length)
    );

    if (beforeText === before && afterText === after) {
      // Remove formatting
      const newText =
        value.substring(0, start - before.length) +
        selectedText +
        value.substring(end + after.length);

      onChange(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start - before.length, end - before.length);
      }, 0);
    } else {
      // Add formatting
      const newText =
        value.substring(0, start) +
        before +
        selectedText +
        after +
        value.substring(end);

      onChange(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
      }, 0);
    }
  };

  const insertHeading = (level: number) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const prefix = '#'.repeat(level) + ' ';

    // Check if the line already starts with the heading
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const existingPrefix = value.substring(lineStart, start);

    if (existingPrefix === prefix) {
      // Remove heading
      const newText =
        value.substring(0, lineStart) + selectedText + value.substring(end);
      onChange(newText);
      textarea.focus();
      textarea.setSelectionRange(lineStart, lineStart + selectedText.length);
    } else {
      // Add heading
      const newText =
        value.substring(0, lineStart) +
        prefix +
        selectedText +
        value.substring(end);
      onChange(newText);
      textarea.focus();
      textarea.setSelectionRange(
        lineStart + prefix.length,
        lineStart + prefix.length + selectedText.length
      );
    }
  };

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <label
          htmlFor='markdown-editor'
          className='block text-sm font-medium text-gray-700 dark:text-gray-200'
        >
          {label}
        </label>
        <button
          type='button'
          onClick={() => setIsPreview(!isPreview)}
          className='px-3 py-1 text-sm rounded-md text-purple-500 hover:text-purple-600 
                   dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-50 
                   dark:hover:bg-purple-900/20 transition-colors'
        >
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>

      <div
        className='rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden 
                    bg-white dark:bg-gray-700/50 shadow-sm'
      >
        {!isPreview && (
          <EditorToolbar
            onBoldClick={() => insertText('**', '**')}
            onItalicClick={() => insertText('*', '*')}
            onBulletClick={() => insertText('- ')}
            onH2Click={() => insertHeading(2)}
            onH3Click={() => insertHeading(3)}
          />
        )}

        <div className='min-h-[300px] relative'>
          {isPreview ? (
            <div
              className='prose prose-purple dark:prose-invert max-w-none p-4 
                        prose-headings:mt-4 prose-headings:first:mt-0
                        prose-p:mt-3 prose-p:first:mt-0
                        prose-li:mt-2
                        dark:prose-p:text-gray-100
                        dark:prose-headings:text-gray-50'
            >
              <ReactMarkdown>{value || '*No content yet*'}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              id='markdown-editor'
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className='w-full h-full min-h-[300px] p-4 resize-y bg-transparent
                       text-gray-900 dark:text-gray-100 placeholder-gray-400
                       dark:placeholder-gray-300 focus:ring-1 border-0
                       focus:border-purple-500 dark:focus:border-purple-400 
                       focus:ring-purple-500 dark:focus:ring-purple-400 
                       focus:outline-none transition-colors'
              placeholder={placeholder}
            />
          )}
        </div>
      </div>
    </div>
  );
}
