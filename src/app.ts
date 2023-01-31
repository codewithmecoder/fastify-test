import buildServer from "./server";

const server = buildServer();

async function main() {
  try {
    await server.listen(3000, "10.2.50.13");

    console.log(`Server ready at http://10.2.50.13:3000`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
