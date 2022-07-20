import users from "../../models/Users";
import db from '../../database'
import usersType from "../../types/users.type";
const User = new users()

describe('User model',()=>{
  describe('logic',()=>{
    const user = {
      user_name:'test',
      first_name:"test",
      last_name:"test",
      password:'1234'
    }as usersType
    beforeAll(async ()=>{
      const createUser = await User.create(user)
      user.id = createUser.id;
    });
    afterAll(async ()=>{
      const connection = await db.connect()
      const sql = 'delete from users;'
      await connection.query(sql)
      connection.release()
    })

    it("create should return a user", async function() {
      const createUser = await User.create({
        user_name:"test1",
        password:"test1",
        last_name:"test1",
        first_name:"test1",
      }as usersType)
      expect(createUser).toEqual({
        id:createUser.id,
        user_name:"test1",
        first_name:"test1",
        last_name:"test1"
      }as usersType)
    });

    it("index should return all users", async function() {
      const users = await User.getAll()
      expect(users.length).toBe(2)
    });

    it("show should return user with specific id", async function() {
      const showUser = await User.getOne(user.id as number);
      expect(showUser).toEqual(
        {
          id:user.id,
          user_name:user.user_name,
          first_name:user.first_name,
          last_name:user.last_name
        }as usersType)
    });
  })
})