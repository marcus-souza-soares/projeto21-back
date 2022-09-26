import { recommendationService } from "../../src/services/recommendationsService";
import { create } from "../factory/recommendationFactory.js";
import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

beforeAll(async () => {
  console.log(
    "Você está rodando o teste no banco de dados: ",
    process.env.DATABASE_URL
  );
  await recommendationService.deleteAll();
});

const tester = supertest(app);

describe("Testes de get de recomendações: ", () => {
  it("Criar 11 recommendations e retorna as 10 primeiras!", async () => {
    for (let i = 0; i <= 10; i++) {
      const recommendations = create();
      await recommendationService.insert(recommendations);
    }
    const recommendations = await tester.get("/recommendations");
    expect(recommendations.body.length).toBe(10);
  });
  it("Pega uma recomendação passando o id e retorna status 200! ", async () => {
    const recommendation = create();
    await recommendationService.insert(recommendation);
    const found = await prisma.recommendation.findFirst({
      where: recommendation,
    });
    const { id } = found;
    const result = await tester.get(`/recommendations/${id}`);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.status).toBe(200);
  });

  it("Pega uma recomendação aleatória na rota /recommendations/random e retorna 200", async () => {
    const result = await tester.get("/recommendations/random");
    expect(result.body).toBeInstanceOf(Object);
    expect(result.status).toBe(200);
  })
});
