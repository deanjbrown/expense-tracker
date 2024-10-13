###
# Database Dockerfile
###

# Use official PostgreSQL image from Docker Hub
FROM postgres:alpine

# Set environment variables
ENV POSTGRES_USER=devtestuser
ENV POSTGRES_PASSWORD=Devtestpassword!123
ENV POSTGRES_DB=devdatabase

# Expose PostgreSQL port
EXPOSE 5432

# Copy custom initialization scripts
# COPY init.sql /docker-entrypoint-initdb.d/

# Optionally, you can mount a volume for persistent data:
VOLUME ["/var/lib/postgresql/data"]