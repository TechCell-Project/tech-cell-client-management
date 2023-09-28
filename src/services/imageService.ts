import instance from './instance';
import { IMAGES_ENDPOINT } from '@constants/service';

export const getImageById = (id: string) =>
  instance.get(`${IMAGES_ENDPOINT}/${id}`);

export const postImage = (payload: FormData) =>
  instance.post(`${IMAGES_ENDPOINT}/array`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
