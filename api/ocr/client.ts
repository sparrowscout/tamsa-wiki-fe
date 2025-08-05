import { AxiosInstance } from 'axios';
import { HTTPClient } from '../core';
import { PostOCRBody } from './type';

export class OCRServes extends HTTPClient {
  constructor(instance: AxiosInstance, service = 'ocr') {
    super(instance, service);
  }

  async getOCRText(data: PostOCRBody) {
    return await this.post('', data.formdata);
  }
}
