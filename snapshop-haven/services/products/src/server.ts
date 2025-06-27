// services/products/src/server.ts
import app from './app';
import '../../../shared/types/custom'
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Products service running on port ${PORT}`);
});
