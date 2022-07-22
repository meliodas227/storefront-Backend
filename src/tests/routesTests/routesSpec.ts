import users from "../../models/Users";
import db from "../../database";
import usersType from "../../types/users.type";
import supertest from "supertest";
import app from "../../server";
import products from "../../models/Products";
import productsType from "../../types/products.type";
import exp from "constants";
import orders from "../../models/Orders";
import arrayWithExactContents = jasmine.arrayWithExactContents;
import ordersType from "../../types/orders.type";

const User = new users();
const Product = new products()
const Order = new orders()
const request = supertest(app)
let userToken = '';
let userID=0,productID=0;
describe('user route endpoints test',() => {
  const user = {
    user_name:'test2',
    last_name:'test2',
    first_name:'test2',
    password:'test2'
  }as usersType
  beforeAll(async ()=>{
    const createuser = await User.create(user)
    user.id = createuser.id
    userID=createuser.id as number;
  })



  describe('test Auth methods',()=>{
    it("should be able to authenticate to get token", async function() {
      const res = await request.post('/api/users/auth')
        .set('Content-type','application/json')
        .send({
          user_name:'test2',
          password:'test2'
        });
      expect(res.status).toEqual(200);
      const {id , user_name,token} = res.body;
      expect(id).toEqual(user.id);
      expect(user_name).toEqual(user.user_name);
      userToken = token;
    });

    it("should be failed to authenticate wrong username or password", async function() {
      const res = await request.post('/api/users/auth')
        .set('Content-type','application/json')
        .send({
          user_name:'wrong_test',
          password:'wrong_test'
        });
      expect(res.status).toEqual(400)
    });
  })

  describe('test api crud methods',async ()=>{
    it("should create a user", async function() {
      const res = await request.post('/api/users')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${userToken}`)
        .send({
          user_name:'testing',
          first_name:'testing',
          last_name:'testing',
          password:'testing123'
        }as usersType)
      expect(res.status).toBe(200)
      const {user_name , first_name, last_name} = res.body.user
      expect(user_name).toBe('testing');
      expect(first_name).toBe('testing')
      expect(last_name).toBe('testing')
    });

    it("should get list of users", async function() {
      const res = await request.get('/api/users')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${userToken}`);
      expect(res.status).toBe(200)
      expect(res.body.length).toBeGreaterThanOrEqual(2)
    });

    it("should get a user", async function() {
      const res = await request.get(`/api/users/${user.id}`)
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${userToken}`);
      expect(res.status).toBe(200)
      expect(res.body.user_name).toBe('test2')
    });
  })
})

describe('product route endpoint test',()=>{
  const product = {
    name:'test2',
    price:2000
  }as productsType;
  beforeAll(async ()=>{
    const createProduct = await Product.create(product)
    product.id = createProduct.id
    productID=createProduct.id as number
  })


  describe('test api crud methods',()=>{
    it("should create a product",async function() {
      const res = await request.post('/api/products')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${userToken}`)
        .send({
          name:'testing',
          price:100
        }as productsType)
      expect(res.status).toBe(200)
      const {id,name,price} = res.body
      productID=id;
      expect(name).toBe('testing')
      expect(parseInt(price)).toBe(100)
    });

    it("should get list of products",async function() {
      const res = await request.get('/api/products')
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${userToken}`)
      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
    });

    it("should get product by id", async function() {
      const res = await request.get(`/api/products/${product.id}`)
        .set('Content-type','application/json')
        .set('Authorization',`Bearer ${userToken}`)
      expect(res.status).toBe(200)
      expect(res.body.id).toBe(product.id)
    });
  })
})

describe('orders endpoint tests',()=>{
  const order = {
    status_of_order:'active',
    quantity_of_product:1
  }as ordersType
  beforeAll(async ()=>{
    order.userId = userID
    order.productId = productID
    await Order.create(order)
  })

  afterAll(async ()=>{
    const connection = await db.connect()
    const sql = 'delete from orders;delete from products;delete from users;'
    await connection.query(sql)
    connection.release()
  })

  it("should get order by uid", async function() {
    const res = await request.get(`/api/orders/${order.userId}`)
      .set('Content-type','application/json')
      .set('Authorization',`Bearer ${userToken}`)
    expect(res.status).toBe(200)
    expect(res.body[0].user_id).toBe(userID)
  });
})

