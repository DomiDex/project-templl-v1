import { MarkdownEditor } from './MarkdownEditor';

interface ServiceDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export function ServiceDescription({
  value,
  onChange,
}: ServiceDescriptionProps) {
  return (
    <MarkdownEditor
      value={value}
      onChange={onChange}
      label='Description'
      placeholder='Describe your service using markdown...'
    />
  );
}
