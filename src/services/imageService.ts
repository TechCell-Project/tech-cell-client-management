import { IMAGES_ENDPOINT } from '@constants/service';
import { ImageModel } from '@models/Product';
import instance from '@config/axios.config';

export const getImageById = (id: string) =>
  instance.get(`${IMAGES_ENDPOINT}/${id}`);

export const postImage = (payload: FormData) =>
  instance.post<ImageModel>(IMAGES_ENDPOINT, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });

export const postImages = (payload: FormData) =>
  instance.post(`${IMAGES_ENDPOINT}/array`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
