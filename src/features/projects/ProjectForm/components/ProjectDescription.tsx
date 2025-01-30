import { MarkdownEditor } from './MarkdownEditor';

interface ProjectDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectDescription({
  value,
  onChange,
}: ProjectDescriptionProps) {
  return (
    <MarkdownEditor
      value={value}
      onChange={onChange}
      label='Description'
      placeholder='Describe your project using markdown...'
    />
  );
}
