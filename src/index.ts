import app from './app.js';
import { Environment } from './config/environment.js';

app.listen(Environment.PORT, () => {
  console.log(`Server đang chạy tại địa chỉ: http://localhost:${Environment.PORT}`);
});