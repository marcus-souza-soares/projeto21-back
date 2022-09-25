/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { jest } from "@jest/globals";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { create } from "../factory/recommendationFactory";
import { prisma } from "../../src/database.js";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Testes unitários do recommendationService", () => {
  it("Criar um recommendation", async () => {
    const recommendation = create();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): null => null);
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): null => null);
    await recommendationService.insert(recommendation);
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("Teste da função upvote no service!", async () => {
    const recommendation = { ...create(), id: 1, score: 6 };
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          ...recommendation,
          id: 1,
        };
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {
          ...recommendation,
          id: 1,
        };
      });
    await recommendationService.upvote(recommendation.id);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Teste da função downvote no service!", async () => {
    const recommendation = { ...create(), id: 1, score: 6 };
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          ...recommendation,
          id: 1,
        };
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {
          ...recommendation,
          id: 1,
        };
      });
    await recommendationService.upvote(recommendation.id);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Teste da função getRandom", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return ["recommendation1", "recommendation2", "recommendation3"];
      });
    const result = await recommendationService.getRandom();
    expect(typeof result).toBe("string");
  });

  it("Teste da função getTop", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return ["recommendation1", "recommendation2", "recommendation3"];
      });
    const result = await recommendationService.getRandom();
    expect(typeof result).toBe("string");
  });
});
