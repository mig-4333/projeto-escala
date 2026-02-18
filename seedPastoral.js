import bcrypt from "bcrypt";
import prisma from "./src/prisma.js";


async function main() {
  // Pastorais de teste
  const pastorais = [
    { nome: 'ADM', senha: '123456' },
    { nome: 'Acolhida', senha: 'pastoral-da-acolhida' }
  ];

  for (const p of pastorais) {
    // gera hash com salt
    const hash = await bcrypt.hash(p.senha, 10);

    // cria no banco
    await prisma.pastoral.create({
      data: {
        nome: p.nome,
        senha: hash
      }
    });

    console.log(`Pastoral ${p.nome} criada com sucesso!`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });