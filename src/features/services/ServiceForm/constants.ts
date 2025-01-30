import { ServiceFormData } from './types';

export const INPUT_CLASSES = `
  mt-1 block w-full rounded-md border border-gray-300 
  dark:border-gray-600 bg-white dark:bg-gray-700/50
  px-3 py-2 text-sm placeholder-gray-400 
  dark:placeholder-gray-300 text-gray-900 
  dark:text-gray-100 focus:border-purple-500 
  dark:focus:border-purple-400 focus:outline-none 
  focus:ring-1 focus:ring-purple-500 
  dark:focus:ring-purple-400 transition-colors
`;

export const INITIAL_FORM_DATA: ServiceFormData = {
  service_name: '',
  path: '',
  stack_id: '',
  price: 0,
  meta_title: '',
  meta_description: '',
  long_description: '',
  og_image_url: '',
};
