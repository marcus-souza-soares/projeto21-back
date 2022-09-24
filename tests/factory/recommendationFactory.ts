import { faker } from "@faker-js/faker";

export function create() {
  return {
    name: faker.lorem.words(3),
    youtubeLink: "https://www.youtube.com/watch?v=hkj1nt_u2U8",
  };
}
