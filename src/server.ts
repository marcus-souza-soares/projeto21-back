import app from "./app.js";
import "../src/config/indexEnv.js"

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
  console.log(`Database: ${process.env.DATABASE_URL}`)
});
