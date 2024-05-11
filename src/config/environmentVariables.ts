import environmentVariablesSchema from "@/schemas/EnvironmentVariableSchema";

const environmentVariables = environmentVariablesSchema.parse(import.meta.env);

export default environmentVariables;
