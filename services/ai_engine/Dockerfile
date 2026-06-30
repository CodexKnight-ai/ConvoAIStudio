FROM python:3.12-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirement.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirement.txt

# Copy application code
COPY app/ ./app/
COPY generated/ ./generated/

# Expose gRPC port (adjust based on your actual port)
EXPOSE 50052

# Run the application
CMD ["python", "-m", "app.main"]
