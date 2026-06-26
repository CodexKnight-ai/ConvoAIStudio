import { createPodcastWorker } from "./queues/podcast.worker.js";
createPodcastWorker();
console.log("Podcast Worker Started");