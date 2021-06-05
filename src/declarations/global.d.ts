declare module NodeJS  {
  interface Global {
    prisma: PrismaClient
  }
}