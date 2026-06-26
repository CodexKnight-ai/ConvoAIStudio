import grpc
from concurrent import futures

from app.config import HOST, PORT
from .service import AIEngineService
from generated import ai_engine_pb2_grpc

server = grpc.server(
    futures.ThreadPoolExecutor(max_workers=10)
)

ai_engine_pb2_grpc.add_AIEngineServicer_to_server(
    AIEngineService(),
    server,
)

server.add_insecure_port(f"{HOST}:{PORT}")
server.start()

print(f"AI Engine gRPC Server started on {HOST}:{PORT}")

server.wait_for_termination()