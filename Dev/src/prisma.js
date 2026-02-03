import 'dotenv/config';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "../src/generated/prisma" 

/**
 * SE A PASTA .prisma NÃO EXISTE:
 * O comando 'npx prisma generate' falhou ou não foi executado.
 * * RESOLUÇÃO PASSO A PASSO:
 * 1. Pare o servidor (Ctrl + C)
 * 2. Execute: npx prisma generate
 * 3. Se ainda assim a pasta não aparecer, force a instalação:
 * npm install @prisma/client
 * npx prisma generate
 */


const { Pool } = pg;

// Configuração da ligação ao Postgres
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ 
    connectionString,
    max: 20, 
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const adapter = new PrismaPg(pool);

let prisma;

try {
    // Inicialização do Prisma utilizando o Adapter (mais estável para Node v22)
    prisma = new PrismaClient({ 
        adapter,
        log: ['error', 'warn']
    });

    // Teste de ligação imediato
    prisma.$connect()
        .then(() => {
            console.log("-----------------------------------------");
            console.log("✅ Conexão Prisma via Adapter: OK");
            console.log("-----------------------------------------");
        })
        .catch((err) => {
            console.error("❌ Erro de ligação ao Banco de Dados:", err.message);
        });

} catch (error) {
    console.error("❌ ERRO: O Prisma Client não foi gerado corretamente.");
    console.error("Execute 'npx prisma generate' no seu terminal.");
}

export default prisma;