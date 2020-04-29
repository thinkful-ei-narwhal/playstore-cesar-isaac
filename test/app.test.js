const app = require('../src/app');
const { expect } = require('chai');
const supertest = require('supertest');

describe('app modules', () => {
	describe('GET /apps', () => {
		//should return 200 object with 20 arrays
		it('should return 200 object with 20 arrays', () => {
			return supertest(app)
				.get('/apps')
				.expect(200)
				.expect('Content-Type', /json/)
				.then((res) => {
					expect(res.body).to.be.an('array');
					expect(res.body).to.have.lengthOf(20);
					expect(res.body[0]).to.be.an('object');
					expect(res.body[0]).to.include.keys(
						'App',
						'Rating',
						'Category',
						'Reviews',
						'Size',
						'Installs',
						'Type',
						'Price',
						'Content Rating',
						'Genres',
						'Last Updated',
						'Current Ver',
						'Android Ver'
					);
				});
		});

		//should return 200 object with 1 arrays
		it('should return 200 object with 1 arrays', () => {
			return supertest(app)
				.get('/apps')
				.expect(200)
				.query({ search: 'subway' })
				.expect('Content-Type', /json/)
				.then((res) => {
					expect(res.body).to.be.an('array');
					expect(res.body).to.have.lengthOf(1);
					expect(res.body[0]).to.be.an('object');
					expect(res.body[0]).to.include.keys(
						'App',
						'Rating',
						'Category',
						'Reviews',
						'Size',
						'Installs',
						'Type',
						'Price',
						'Content Rating',
						'Genres'
					);
				});
		});

		const sortValues = ['rating', 'app'];

		sortValues.forEach((sortValue) => {
			it('should return sorted aarray objects', () => {
				return supertest(app)
					.get('/apps')
					.query({ sort: sortValue })
					.expect(200)
					.then((res) => {
						let i = 0;
						let sorted = true;

						while (sorted && i < res.body.length - 1) {
							if (res.body[i][sortValue] > res.body[i + 1][sortValue]) {
								sorted = false;
							}

							i++;
						}
						expect(sorted).to.be.true;
					});
			});
        });
      
        it('should return 200 object with 1 arrays', ()=>{
            return supertest(app)
              .get('/apps')
              .query({ sort: 'invalid'})
              .expect(400,'Sort must be one of rating or app');
          });  
	});
});
