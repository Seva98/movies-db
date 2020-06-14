import { IMediaData } from './types.d';
import axios, { AxiosResponse } from 'axios';

interface IServerResponse {
  config: Object;
  headers: Object;
  request: Object;
  status: number;
  statusText: string;
  data: {
    code: number;
    data: {
      total: number;
      items: IMediaData[];
    };
    items: IMediaData[];
  };
}

// export abstract class MediaApi {
//   private static mediaApi = axios.create();

//   static async getAllMedia() {}
// }

export default class ApiClient {
  private url: string = 'http://localhost:9528/api/v1/media';

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
