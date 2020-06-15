import { IApiClient, IMediaData, IServerResponse } from './types.d';
import axios, { AxiosResponse } from 'axios';

export default class ApiClient implements IApiClient {
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
    await axios.post(this.url, media);
  }

  public async updateItem(media: IMediaData): Promise<void> {
    await axios.put(`${this.url}/${media.guid}`, media);
  }

  public async deleteItem(media: IMediaData): Promise<void> {
    await axios.delete(`${this.url}/${media.guid}`);
  }
}
