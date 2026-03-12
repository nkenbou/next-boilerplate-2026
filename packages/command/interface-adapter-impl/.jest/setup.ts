const baseUrl = process.env.DATABASE_URL?.split("?")[0];
process.env.DATABASE_URL = `${baseUrl}?schema=test`;
