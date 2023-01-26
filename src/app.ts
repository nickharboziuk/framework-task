import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';

import { errorHandlerMiddleware } from './middlewares';
import { ConfigurationService } from './modules/configurations/configuration.service';
import { API_PREFIX } from './modules/utils/constants';
import { RootRouter, ScoreRouter, WordsRouter } from './routes';

export class App {
  private readonly app: Express;
  private readonly APP_PORT: string;
  constructor(private readonly configuration: ConfigurationService) {
    this.app = express();
    this.APP_PORT = configuration.get('APP_PORT');
  }

  public async createApplication(): Promise<void> {
    this.setupStandardMiddlewares();
    this.setupMiddlewares();
    this.setupErrorMiddleware();
    this.listen();
  }

  private setupStandardMiddlewares(): void {
    // eslint-disable-next-line unicorn/prefer-module
    this.app.use(express.static(__dirname));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: this.configuration.get('FRONT_END_API_ENDPOINT'),
        methods: ['GET', 'POST'],
      })
    );
  }

  private setupErrorMiddleware(): void {
    this.app.use(errorHandlerMiddleware);
  }

  private setupMiddlewares(): void {
    this.app.use(RootRouter);
    this.app.use(`/${API_PREFIX}`, ScoreRouter);
    this.app.use(`/${API_PREFIX}`, WordsRouter);
  }

  private listen(): void {
    this.app.listen(this.APP_PORT, () => {
      // eslint-disable-next-line no-console
      console.log('Server', process.pid, 'listening on port', this.APP_PORT);
    });
  }
}
const app = new App(new ConfigurationService());

app.createApplication();
