import { recommendationService } from "../../src/services/recommendationsService.js";
import { create } from "../factory/recommendationFactory.js";
import { Recommendation } from "@prisma/client";
import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

beforeEach(async () => {
  console.log(
    "Você está rodando o teste no banco de dados: ",
    process.env.DATABASE_URL
  );
  await recommendationService.deleteAll();
});
const tester = supertest(app);

describe("Testes relacionados ao upvote e downvote", () => {
  it("Deve inserir uma recommendation no database e verificar se ouve acréscimo de uma unidade nas recomendações", async () => {
    {
      const recommendation = create();
      await recommendationService.insert(recommendation);
      const foundBefore: Recommendation = await prisma.recommendation.findFirst({
        where: recommendation,
      });
      const { score, id } = foundBefore;
      const result = await tester.post(`/recommendations/${id}/upvote`).send({});
      expect(result.status).toBe(200);
      const foundAfter: Recommendation = await prisma.recommendation.findFirst({
        where: recommendation,
      });
      const score2 = foundAfter.score;
      expect(score2).toBe(score + 1);
    }
  });

  it("Deve inserir uma recommendation no database e verificar se ouve decréscimo de uma unidade nas recomendações", async () => {
    {
      const recommendation = create();
      await recommendationService.insert(recommendation);
      const foundBefore: Recommendation = await prisma.recommendation.findFirst({
        where: recommendation,
      });
      const { score, id } = foundBefore;
      const result = await tester.post(`/recommendations/${id}/downvote`).send({});
      expect(result.status).toBe(200);
      const foundAfter: Recommendation = await prisma.recommendation.findFirst({
        where: recommendation,
      });
      const score2 = foundAfter.score;
      expect(score2).toBe(score - 1);
    }
  });
  it("Deve inserir uma recommendation no database e verificar se ouve exclusão após reduzir as recomendações abaixo de 5!", async () => {
    {
      const recommendation = create();
      await recommendationService.insert(recommendation);
      const foundBefore: Recommendation = await prisma.recommendation.findFirst({
        where: recommendation,
      });
      const {id } = foundBefore;
      for(let i = 0; i > -6; i--){
        await tester.post(`/recommendations/${id}/downvote`).send({});
      }

      const foundAfter: Recommendation = await prisma.recommendation.findFirst({
        where: recommendation,
      });

      expect(foundAfter).toBe(null);
    }
  });
});