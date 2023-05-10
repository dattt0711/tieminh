import { axiosBodyToAPI, sendQueryToAPI } from './common';
import queryString from 'query-string';

const API_CREATE_COMMENT = "http://localhost:3003/comments/create";
const API_LIST_COMMENT = "http://localhost:3003/comments/list";

export const fetchCreateComment = (params) => {
    const body = params;
    return axiosBodyToAPI('POST', API_CREATE_COMMENT, body);
};

export const fetchListCommentsApi = (params = {}) => {
    let queryParams = '';
    if (Object.keys(params).length > 0) {
        queryParams = `?${queryString.stringify(params)}`;
    }
    return sendQueryToAPI(`${API_LIST_COMMENT}${queryParams}`);
};
