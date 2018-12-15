import { IResponseMeta } from './responseMeta';
export interface IListResponse<T> {
    meta: IResponseMeta;
    data: T[];
}
