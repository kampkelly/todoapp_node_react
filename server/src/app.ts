import app from './server';

const port = process.env.PORT || 3001;
const { pid } = process;

app.listen(port, () => {
  console.log(`🚀 Server listening at port ${port} with PID ${pid}`);
});

process.on('unhandledRejection', (reason: any): void => {
  throw reason;
});

export default app;
