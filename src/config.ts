function validateEnvVar(name: string): string {
  const value = import.meta.env[name] as string | undefined;

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  try {
    new URL(value);
  } catch {
    throw new Error(`Invalid URL provided for ${name}: ${value}`);
  }

  return value;
}

export const API_BASE_URL = validateEnvVar("VITE_API_BASE_URL");

export const API_URL_PATHS = {
  expense: "/expenses",
};
