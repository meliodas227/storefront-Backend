import users from "../../models/Users";
import db from "../../database";
import usersType from "../../types/users.type";
import supertest from "supertest";
import app from "../../server";

const User = new users();
const request = supertest(app)
let userToken = '';
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
  })

  afterAll(async ()=>{
    const connection = await db.connect()
    const sql = 'delete from users'
    await connection.query(sql)
    connection.release()
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
      expect(res.body.length).toBe(2)
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