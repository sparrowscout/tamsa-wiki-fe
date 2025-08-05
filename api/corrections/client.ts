import { AxiosInstance } from 'axios';
import { axiosInstance, HTTPClient } from '../core';
import { PostCorrectionsBody } from './type';

export class CorrectionsService extends HTTPClient {
  constructor(instance: AxiosInstance, service = 'corrections') {
    super(instance, service);
  }

  async postCorrections(data: PostCorrectionsBody) {
    return await this.post('', data);
  }
}

const correctionService = new CorrectionsService(axiosInstance);

export default correctionService;
