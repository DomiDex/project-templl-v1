'use client';

import { useState } from 'react';
import { ProjectNameInput } from './ProjectNameInput';
import { StackSelect } from './StackSelect';
import { ProjectUrlInput } from './ProjectUrlInput';
import { ProjectDescription } from './ProjectDescription';
import { MetaFields } from './MetaFields';
import { ImageUpload } from './ImageUpload';
import { SubmitButton } from './SubmitButton';
import { useProjectForm } from './hooks/useProjectForm';
import { useStackOptions } from './hooks/useStackOptions';

export default function ProjectForm() {
  const [loading, setLoading] = useState(false);
  const { formData, setFormData, handleSubmit } = useProjectForm();
  const { stacks } = useStackOptions();

  const handleFormSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      await handleSubmit(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className='space-y-6'>
      <div className='flex gap-4'>
        <ProjectNameInput
          value={formData.project_name}
          onChange={(value) =>
            setFormData({ ...formData, project_name: value })
          }
        />
        <StackSelect
          value={formData.stack_id}
          onChange={(value) => setFormData({ ...formData, stack_id: value })}
          stacks={stacks}
        />
      </div>

      <ProjectUrlInput
        value={formData.project_link}
        onChange={(value) => setFormData({ ...formData, project_link: value })}
      />

      <ProjectDescription
        value={formData.long_description}
        onChange={(value) =>
          setFormData({ ...formData, long_description: value })
        }
      />

      <MetaFields
        title={formData.meta_title}
        description={formData.meta_description}
        onTitleChange={(value) =>
          setFormData({ ...formData, meta_title: value })
        }
        onDescriptionChange={(value) =>
          setFormData({ ...formData, meta_description: value })
        }
      />

      <ImageUpload
        imageUrl={formData.og_image_url}
        onImageChange={(url) => setFormData({ ...formData, og_image_url: url })}
      />

      <SubmitButton loading={loading} />
    </form>
  );
}
