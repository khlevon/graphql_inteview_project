import { Worker } from "worker_threads";
import path from "path";
import logger from "../common/logger";
import { IS_PROD } from "../config/secrets";

export const runWorkers = async () => {
  /// run dataSync worker

  const dataSyncWorker = new Worker(path.join(__dirname, "dataSync"), {
    execArgv: !IS_PROD ? ["-r", "ts-node/register/transpile-only"] : undefined, // in dev mode run using ts-node

    workerData: {
      interval: 1000 * 60 * 60,
    },
  });

  dataSyncWorker.on("exit", (code) => {
    if (code !== 0) {
      logger.error({
        message: `dataSync worker stopped with exit code ${code}`,
      });
    } else {
      logger.info({
        message: `dataSync worker stopped successfully`,
      });
    }
  });
};
