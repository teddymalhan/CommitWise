import {Pool} from 'pg';
import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "@prisma/client";

// @ts-ignore
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({adapter});
