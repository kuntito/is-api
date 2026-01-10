import dotenv from "dotenv";

// allows project see `process.env` on the terminal
dotenv.config();

const requiredVariables = [
    "OPENAI_API_KEY",
    "GROK_API_KEY",
    // "ENV_VAR_2",
] as const;

for (const key of requiredVariables) {
    if (!process.env[key]) {
        throw new Error(`missing environment variable: ${key}`);
    }
}

// union type of all the variables in `requiredVariables`
// it's functionally equivalent to: "OPENAI_API_KEY" | "GROK_API_KEY" |"ENV_VAR_2 ...",
type RequiredVariableKey = (typeof requiredVariables)[number];

// this allows ts to recognize `config.ENV_VAR_2`, ...
type ConfigType = Record<RequiredVariableKey, string>;

export const envConfig = Object.fromEntries(
    requiredVariables.map((key) => [key, process.env[key]!])
) as ConfigType;
