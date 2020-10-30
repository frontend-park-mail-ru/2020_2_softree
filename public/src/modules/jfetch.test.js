import { async } from 'regenerator-runtime';
import { jfetch } from './jfetch.js';

describe('jfetch', () => {
    it('fetches data from server when server returns a successful response', async done => {
        const mockSuccessResponse = {
            ok: true,
            status: 200,
            data: {
                test: 'success',
            },
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });

        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const response = await jfetch('/');
        console.log(response);

        expect(response).toEqual({
            ok: true,
            status: 200,
            data: {
                test: 'success',
            },
        });

        global.fetch.mockClear();
        delete global.fetch;
        done();
    });
});
