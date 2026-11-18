import { GoogleGenAI } from "@google/genai";
import readline from "readline-sync";
import dotenv from "dotenv";

dotenv.config();

const myapikey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apikey: myapikey });

let previousResponseId = null

while (true) {
  const question = readline.question("You");

  if (question === "exit") {
    break;
  }

  const response = await ai.interactions.create({
    model: "gemini-3.1-flash-lite",
    input: question,
    previous_interaction_id: previousResponseId,
    generation_config: {
      thinking_level: "medium"
    },
    system_instruction: "You are a agent. your name is Hanuman "
  });

  console.log(response.output_text);

  previousResponseId = response.id
}
