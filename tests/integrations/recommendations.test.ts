import { recommendationService } from "../../src/services/recommendationsService.js";
import { create } from "../factory/recommendationFactory.js";
import supertest from "supertest";
import app from "../../src/app.js";

beforeAll(async () => {
  console.log(
    "Você está rodando o teste no banco de dados: ",
    process.env.DATABASE_URL
  );
  await recommendationService.deleteAll();
});

const tester = supertest(app);

describe("Testes de criação de /recommendations", () => {
  it("Cria uma recommendation aleatória e retorna 201", async () => {
    const recommendation = create();
    const result = await tester.post("/recommendations").send(recommendation);
    expect(result.status).toBe(201);
  });

  it("Cria uma recommendation como undefined e retorna 422", async () => {
    const recommendation = undefined;
    const result = await tester.post("/recommendations").send(recommendation);
    expect(result.status).toBe(422);
  });
});
