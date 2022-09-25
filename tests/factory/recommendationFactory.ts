import { faker } from "@faker-js/faker";
import { Recommendation } from "@prisma/client";

export function create():Omit<Recommendation, "id" | "score"> {
  return {
    name: faker.lorem.words(3),
    youtubeLink: "https://www.youtube.com/watch?v=hkj1nt_u2U8",
  };
}
