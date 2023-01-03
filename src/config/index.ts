import dotenvExtended from 'dotenv-extended';
import dotenvParseVariables from 'dotenv-parse-variables';

const env = dotenvExtended.load({
  path: '.env',
  defaults: './env/defaults.env',
  schema: './env/schema.env',
  includeProcessEnv: true,
  silent: false,
  errorOnMissing: true,
  errorOnExtra: true
});

const parsedEnv = dotenvParseVariables(env);

// Define log levels type (silent + Winston default npm)
type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
type Environment = 'development' | 'production' | 'staging';

interface Config {
  environment: Environment,
  app: {
    port: number;
    host: string;
  }
  postgres: {
    url: string,
  },

  loglevel: LogLevel,
  applogger: boolean
}

const config: Config = {
  app: {
    port: parsedEnv.PORT as number,
    host: parsedEnv.HOST as string,
  },

  postgres: {
    url: parsedEnv.DATABASE_URL as string,
  },

  loglevel: parsedEnv.LOGGER_LEVEL as LogLevel,
  applogger: parsedEnv.APP_LOGGER as boolean,
  environment: parsedEnv.NODE_ENV as Environment,
};

export default config;
