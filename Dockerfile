FROM python:3.12-slim

# The installer requires curl (and certificates) to download the release archive
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates

# Download the latest installer
ADD https://astral.sh/uv/install.sh /uv-installer.sh

# Run the installer then remove it
RUN sh /uv-installer.sh && rm /uv-installer.sh

# Ensure the installed binary is on the `PATH`
ENV PATH="/root/.local/bin/:$PATH"

# Set environment variables to prevent Python from writing .pyc files and buffering stdout/stderr.
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY . /app

# Set the working directory in the container.
WORKDIR /app

# Install dependencies
RUN uv sync --locked

# Set the Flask app environment variable
ENV FLASK_APP=app.py
# Set Flask to run in development mode
ENV FLASK_ENV=development

# Expose the port that Flask runs on.
EXPOSE 5000

# Run the application.
CMD ["uv", "run", "flask", "run", "--host=0.0.0.0"]
