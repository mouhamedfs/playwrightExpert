import {test, expect} from "@playwright/test";


test.describe('Test API on gitbook documentation', ()=> {

    test('should get APi status', async ({request}) => {

        const response = await request.get('https://simple-books-api.glitch.me/status')
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
    })

    test('should get Books', async ({request}) => {
        const response = await request.get('https://simple-books-api.glitch.me/books', {
            params: {
                type: 'fiction',  // Replace with the desired type
                limit: 5          // Replace with the desired limit
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
    });

    test('should get a single Book', async ({request}) => {
        const bookId = 1;
        const response = await request.get(`https://simple-books-api.glitch.me/books/${bookId}`, {
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log(body);
    });
});