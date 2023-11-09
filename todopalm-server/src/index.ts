import app from "./app";

async function main(): Promise<void> {
  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`Server listening on port ${port} 🚀`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
