import { PrismaClient } from "@prisma/client";

interface CustomNodeJsGlobals extends NodeJS.Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobals;

const prisma = global.prisma || new PrismaClient();
//console.log("global prisma is ", global.prisma);
if (process.env.NODE_ENV === "development") global.prisma = prisma;
console.log("env is ", process.env.NODE_ENV);
export default prisma;
