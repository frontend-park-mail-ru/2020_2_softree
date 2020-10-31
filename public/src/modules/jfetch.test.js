import { jfetch } from './jfetch.js';

describe('jfetch', () => {
    it('fetches data - successful response', async done => {
        const mockSuccessResponse = {
            test: 'success',
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
            ok: true,
            status: 200,
        });

        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const response = await jfetch('/');

        expect(response).toEqual({
            status: 200,
            data: {
                test: 'success',
            },
        });

        global.fetch.mockClear();
        delete global.fetch;
        done();
    });

    it('fetches data - bad response', async done => {
        const mockSuccessResponse = {
            test: 'bad',
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
            ok: false,
            status: 400,
        });

        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        jfetch('/').catch(data => {
            expect(data).toEqual({
                status: 400,
                data: {
                    test: 'bad',
                },
            });
        });

        global.fetch.mockClear();
        delete global.fetch;
        done();
    });
});
