import users from "../../models/Users";
import db from '../../database'
import usersType from "../../types/users.type";

const User = new users()


describe('authentication',()=>{
  describe('method exists?',()=>{
    it("should have an auth method in users", ()=> {
      expect(User.auth).toBeDefined()
    });
  })
  describe('test logic',()=>{
    const user={
      user_name:'test',
      first_name:"test",
      last_name:"test",
      password:'1234'
    } as usersType;
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

    it("should return the auth user",async function() {
      const authUser = await User.auth(user.user_name ,user.password)
      expect(authUser?.user_name).toBe(user.user_name)
      expect(authUser?.id).toBe(user.id)
      expect(authUser?.first_name).toBe(user.first_name)
      expect(authUser?.last_name).toBe(user.last_name)
    });
    it("should return null for wrong cardentials",async function() {
      const authUser = await User.auth("fake" ,"fake")
      expect(authUser).toBe(null)
    });
  })
})