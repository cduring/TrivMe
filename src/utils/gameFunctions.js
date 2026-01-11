import {
  uniqueUsernameGenerator,
  adjectives,
  nouns,
} from "unique-username-generator";

const config = {
  dictionaries: [adjectives, nouns],
  seperator: "",
  style: "titleCase",
  randomDigits: 0,
};

export function generateNickname() {
  return uniqueUsernameGenerator(config);
}
