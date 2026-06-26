import time

from generated import ai_engine_pb2
from generated import ai_engine_pb2_grpc
import logging

logger = logging.getLogger(__name__)

class AIEngineService(ai_engine_pb2_grpc.AIEngineServicer):
    def StartPodcast(self, request_iterator, context):
        request = next(request_iterator)

        logger.info("Podcast started")

        yield ai_engine_pb2.PodcastResponse(
            sequence=1,
            transcript="Hello everyone..."
        )

        time.sleep(1)

        yield ai_engine_pb2.PodcastResponse(
            sequence=2,
            transcript="Today's topic is AI..."
        )

        time.sleep(1)

        yield ai_engine_pb2.PodcastResponse(
            sequence=3,
            transcript="Let's begin..."
        )