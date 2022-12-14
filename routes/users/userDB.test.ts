const { get, getBy, getById, create, update, remove } = require("./userDB");
const db = require("../../data/dbConfig.js");

beforeEach(() => {
  return db("users").truncate();
});

describe("users model", () => {
  describe("insert function", () => {
    it("should insert a user", async () => {
      await create({
        username: "iffy_oak",
        password: "c00l_pa$$word",
        email: "ifiok@email.com",
      });
      await create({
        username: "josh_armantrout",
        password: "p4$$w0rd",
        email: "josh.armantrout@email.com",
      });

      const users = await db("users");
      expect(users).toHaveLength(2);
    });
    it("should  get a user", async () => {
      await create({
        username: "iffy_oak",
        password: "c00l_pa$$word",
        email: "ifiok@email.com",
      });
      await create({
        username: "josh_armantrout",
        password: "p4$$w0rd",
        email: "josh.armantrout@email.com",
      });

      const getUser = await getById(2);
      const getByName = await getBy({ username: "iffy_oak" });

      expect(getUser).toEqual({
        username: "josh_armantrout",
        id: 2,
        email: "josh.armantrout@email.com",
      });
      expect(getByName).toBeDefined();
    });
    it("should  get all users", async () => {
      await create({
        username: "iffy_oak",
        password: "c00l_pa$$word",
        email: "ifiok@email.com",
      });
      await create({
        username: "josh_armantrout",
        password: "p4$$w0rd",
        email: "josh.armantrout@email.com",
      });

      const allUsers = await get();

      expect(allUsers).toHaveLength(2);
    });
    it("should  get a user by username", async () => {
      await create({
        username: "iffy_oak",
        password: "c00l_pa$$word",
        email: "ifiok@email.com",
      });
      await create({
        username: "josh_armantrout",
        password: "p4$$w0rd",
        email: "josh.armantrout@email.com",
      });

      const getByName = await getBy({ username: "iffy_oak" });

      expect(getByName).toBeDefined();
    });
    it("should  delete a user", async () => {
      await create({
        username: "iffy_oak",
        password: "c00l_pa$$word",
        email: "ifiok@email.com",
      });
      await create({
        username: "josh_armantrout",
        password: "p4$$w0rd",
        email: "josh.armantrout@email.com",
      });

      await remove(2);
      const usersCount = await db("users");
      expect(usersCount).toHaveLength(1);
    });
    it("should not post user with an existing name", async () => {
      try {
        await create({
          username: "josh_armantrout",
          password: "p4$$w0rd",
          email: "josh.armantrout@email.com",
        });
        await create({
          username: "josh_armantrout",
          password: "p4$$w0rd",
          email: "josh.armantrout@email.com",
        });
      } catch (error: any) {
        expect(error.code).toBe("SQLITE_CONSTRAINT");
      }
    });
  });
});
