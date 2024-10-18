const request = require('supertest');
const app = require('../app');

describe('Products API', () => {

    // Testing GET /products
    describe('GET /products', () => {
        it('should return all products', async () => {
            const res = await request(app).get('/products');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    // Testing GET /products/:id
    describe('GET /products/:id', () => {
        it('should return a product by ID', async () => {
            const productId = 1;
            const res = await request(app).get(`/products/${productId}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', productId);
        });

        it('should return 404 if product not found', async () => {
            const nonExistentId = 9999;
            const res = await request(app).get(`/products/${nonExistentId}`);

            expect(res.statusCode).toEqual(404);
        });
    });

    // Testing POST /products
    describe('POST /products', () => {
        it('should add a new product', async () => {
            const newProduct = {
                name: 'Test Product',
                price: 19.99
            };

            const res = await request(app)
                .post('/products')
                .send(newProduct);

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('name', newProduct.name);
        });

        it('should return 201 if product data is invalid', async () => {
            const invalidProduct = {
            };

            const res = await request(app)
                .post('/products')
                .send(invalidProduct);

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
        });
    });

    // Testing PUT /products/:id
    describe('PUT /products/:id', () => {
        it('should update an existing product', async () => {
            const productId = 1;
            const updatedProduct = {
                name: 'Updated Product',
                price: 29.99
            };

            const res = await request(app)
                .put(`/products/${productId}`)
                .send(updatedProduct);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('name', updatedProduct.name);
        });

        it('should return 200 if update data is invalid', async () => {
            const productId = 1;
            const invalidData = {

            };

            const res = await request(app)
                .put(`/products/${productId}`)
                .send(invalidData);

            expect(res.statusCode).toEqual(200);
        });

        it('should return 404 if product not found', async () => {
            const nonExistentId = 9999;
            const updatedProduct = {
                name: 'Non-existent Product',
                price: 29.99
            };

            const res = await request(app)
                .put(`/products/${nonExistentId}`)
                .send(updatedProduct);

            expect(res.statusCode).toEqual(404);
        });
    });

    // Testing DELETE /products/:id
    describe('DELETE /products/:id', () => {
        it('should delete a product', async () => {
            const productId = 1;
            const res = await request(app)
                .delete(`/products/${productId}`);

            expect(res.statusCode).toEqual(200);
        });

        it('should return 404 if product not found', async () => {
            const nonExistentId = 9999;

            const res = await request(app)
                .delete(`/products/${nonExistentId}`);

            expect(res.statusCode).toEqual(404);
        });
    });

    // Testing Invalid Routes (404)
    describe('Invalid Routes', () => {
        it('should return 404 for an unknown GET route', async () => {
            const res = await request(app).get('/invalid-route');

            expect(res.statusCode).toEqual(404);
            expect(res.text).toContain('Cannot GET /invalid-route');
        });

        it('should return 404 for another unknown POST route', async () => {
            const res = await request(app).post('/another-invalid-route');

            expect(res.statusCode).toEqual(404);
            expect(res.text).toContain('Cannot POST /another-invalid-route');
        });
    });

});
