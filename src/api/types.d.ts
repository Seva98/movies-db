export interface IMediaData {
  guid: string;
  title: string;
  type: string;
  kind: string;
  number_of_discs: number;
  release_year: number;
}
export interface IServerResponse {
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

export interface IApiClient {
  defaultMedia: IMediaData;
  getAllMedia: () => Promise<IMediaData>;
  createItem: (media: IMediaData) => Promise<void>;
  updateItem: (media: IMediaData) => Promise<void>;
  deleteItem: (media: IMediaData) => Promise<void>;
}
