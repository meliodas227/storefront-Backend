import app from "../../server";
import supertest from "supertest";

const request = supertest(app);

describe("test basic endpoint server", () => {
  it("should get the / end point", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
