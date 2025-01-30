import { Bold, Italic, List } from 'lucide-react';

interface EditorToolbarProps {
  onBoldClick: () => void;
  onItalicClick: () => void;
  onBulletClick: () => void;
  onH2Click: () => void;
  onH3Click: () => void;
}

export function EditorToolbar({
  onBoldClick,
  onItalicClick,
  onBulletClick,
  onH2Click,
  onH3Click,
}: EditorToolbarProps) {
  const buttonClasses = `p-2 text-gray-600 hover:text-purple-500 dark:text-gray-400 
                        dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 
                        rounded transition-colors`;

  return (
    <div
      className='flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700
                    bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm'
    >
      <button
        type='button'
        onClick={onH2Click}
        className={buttonClasses}
        title='Heading 2'
      >
        H2
      </button>
      <button
        type='button'
        onClick={onH3Click}
        className={buttonClasses}
        title='Heading 3'
      >
        H3
      </button>
      <div className='w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1' />
      <button
        type='button'
        onClick={onBoldClick}
        className={buttonClasses}
        title='Bold (Ctrl+B)'
      >
        <Bold className='w-4 h-4' />
      </button>
      <button
        type='button'
        onClick={onItalicClick}
        className={buttonClasses}
        title='Italic (Ctrl+I)'
      >
        <Italic className='w-4 h-4' />
      </button>
      <button
        type='button'
        onClick={onBulletClick}
        className={buttonClasses}
        title='Bullet List'
      >
        <List className='w-4 h-4' />
      </button>
    </div>
  );
}
