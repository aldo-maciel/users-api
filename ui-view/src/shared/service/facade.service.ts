import toastr from 'toastr';
import axios, { Method } from 'axios';

export class ServiceFacade {
    protected getUrl(url: string): string {
        const base = '/api/v1/';
        if (process.env.NODE_ENV === 'production') {
            return `${ base }${ url }`;
        }
        return `http://localhost:3001${ base }${ url }`;
    }

    private async doRequest<T>(method: Method = 'GET', url: string, params?: unknown, body?: unknown): Promise<T> {
        try {
            const parameters = {
                url,
                method,
                params,
                data: body,
                headers: {}
            };
            if (body) {
                parameters.data = body;
            }
            if (params) {
                parameters.params = params;
            }
            return await axios.request(parameters);
        } catch (error) {
            const { response = { data: {} } } = error;
            toastr.error(response.data.message || error.message || 'An operation occurs with error!', 'Error');
            throw error;
        }
    }

    /**
     * Make a post request to the server
     *
     */
    doPost<T>(url: string, params?: unknown): Promise<T> {
        return this.doRequest('post', this.getUrl(url), undefined, params);
    }

    /**
     * Make a get request to the server
     *
     */
    doGet<T>(url: string, params?: unknown): Promise<T> {
        return this.doRequest('get', this.getUrl(url), params);
    }

    /**
     * Make a put request to the server
     *
     */
    doPut<T>(url: string, params?: unknown): Promise<T> {
        return this.doRequest('put', this.getUrl(url), undefined, params);
    }

    /**
     * Make a delete request to the server
     *
     */
    doDelete<T>(url: string, params?: unknown): Promise<T> {
        return this.doRequest('delete', this.getUrl(url), params);
    }
}
