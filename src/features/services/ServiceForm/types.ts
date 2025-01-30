export interface ServiceFormData {
  service_name: string;
  path: string;
  stack_id: string;
  price: number;
  meta_title: string;
  meta_description: string;
  long_description: string;
  og_image_url: string;
}

export interface StackOption {
  id: string;
  stack_name: string;
}
