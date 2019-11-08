const request = require('supertest')
const app = require('../server')

let TOKEN = '';
let propertyId = '';

describe('Login Endpoint ', () => {
    it('Should login', async () => {
      
      
      const responseLogin = await request(app)
        .post('/api/v1/auth/login') 
        .send({
          username: 'admin',
          password: 'admin123',
        })
  
      expect(responseLogin.statusCode).toEqual(200)
      expect(responseLogin.body).toHaveProperty("auth");
      expect(responseLogin.body.auth).toBe(true);
    
      TOKEN = responseLogin.body.token.value;


    })
  })


describe('POST Endpoint ', () => {
  it('should create property publication', async () => {
      
    const responseCreate = await request(app)
      .post('/api/v1/properties/')
      .set('x-access-token', TOKEN) 
      .send({
        title: 'I rental Itec by $30,nice internet',
        contract: 'rental',
        type: 'house',
        address: 'Tejerina 867',
      })

    expect(responseCreate.statusCode).toEqual(200)
    expect(responseCreate.body).toHaveProperty("property");
    propertyId  = responseCreate.body.property._id;

  })
})

describe('PUT Endpoint ', () => {
  it('should edit property publication', async () => {
    
    const responseEdit = await request(app)
      .put(`/api/v1/properties/${propertyId}`)
      .set('x-access-token', TOKEN) 
      .send({
        title: 'I rental Itec by $30 or less',
        address: 'Tejerina 867',
      })

    expect(responseEdit.statusCode).toEqual(200)
    expect(responseEdit.body.title).toBe("I rental Itec by $30 or less");
    expect(responseEdit.body.address).toBe("Tejerina 867");

  })
})

describe('GET Endpoint ', () => {
  it('should get property publication', async () => {
    
    const responseEdit = await request(app)
      .get(`/api/v1/properties/${propertyId}`)
      .set('x-access-token', TOKEN) 

    expect(responseEdit.statusCode).toEqual(200)
    expect(responseEdit.body.title).toBe("I rental Itec by $30 or less");
    expect(responseEdit.body.address).toBe("Tejerina 867");
    expect(responseEdit.body.type).toBe("house");
    expect(responseEdit.body.contract).toBe("rental");

  })
})

describe('DELETE Endpoint ', () => {
  it('should delete property publication', async () => {
    
    const responseDelete = await request(app)
    .delete(`/api/v1/properties/${propertyId}`)
    .set('x-access-token', TOKEN) 

    expect(responseDelete.statusCode).toEqual(200)

  })
})


