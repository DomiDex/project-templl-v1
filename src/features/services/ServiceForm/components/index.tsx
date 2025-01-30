'use client';

import { useState } from 'react';
import { ServiceNameInput } from './ServiceNameInput';
import { StackSelect } from './StackSelect';
import { PriceInput } from './PriceInput';
import { MetaFields } from './MetaFields';
import { ServiceDescription } from './ServiceDescription';
import { ImageUpload } from './ImageUpload';
import { SubmitButton } from './SubmitButton';
import { useServiceForm } from '../hooks/useServiceForm';
import { useStackOptions } from '../hooks/useStackOptions';

export default function ServiceForm() {
  const [loading, setLoading] = useState(false);
  const { formData, setFormData, handleSubmit } = useServiceForm();
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
        <ServiceNameInput
          value={formData.service_name}
          onChange={(value) =>
            setFormData({ ...formData, service_name: value })
          }
        />
        <StackSelect
          value={formData.stack_id}
          onChange={(value) => setFormData({ ...formData, stack_id: value })}
          stacks={stacks}
        />
      </div>

      <PriceInput
        value={formData.price}
        onChange={(value) => setFormData({ ...formData, price: value })}
      />

      <ServiceDescription
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
