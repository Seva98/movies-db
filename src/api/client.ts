import { IMediaData, IServerResponse } from './types.d';
import axios, { AxiosResponse } from 'axios';

export default class ApiClient {
  private url: string = 'http://localhost:9528/api/v1/media';

  public defaultMedia: IMediaData = {
    guid: '',
    title: '',
    type: '',
    kind: '',
    number_of_discs: 1,
    release_year: 2020,
  };

  public async getAllMedia(): Promise<IMediaData[]> {
    const response: AxiosResponse<IServerResponse> = await axios.get<IServerResponse>(this.url);

    const { items } = response.data.data;
    return items;
  }

  public async createItem(media: IMediaData): Promise<void> {
    try {
      await axios.post(this.url, media);
    } catch (error) {
      console.error(error);
    }
  }

  public async updateItem(media: IMediaData) {
    console.log(media);
    console.log(media.guid);
    console.log(`${this.url}/${media.guid}`);
    try {
      await axios.put(`${this.url}/${media.guid}`, media);
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteItem(media: IMediaData): Promise<void> {
    try {
      await axios.delete(`${this.url}/${media.guid}`);
    } catch (error) {
      console.error(error);
    }
  }
}
