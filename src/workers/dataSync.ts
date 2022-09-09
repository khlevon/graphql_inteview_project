import { workerData } from "worker_threads";
import logger from "../common/logger";
const { interval } = workerData;

async function main() {
  // TODO: implement worker
}

main().catch((err) => {
  logger.error({
    message: "Error in worker",
    data: err,
  });
  process.exit(1);
});
