FROM redis:latest

# Copy the custom entrypoint script
COPY custom-entrypoint.sh /usr/local/bin/custom-entrypoint.sh

# Make the script executable
RUN chmod +x /usr/local/bin/custom-entrypoint.sh

# Set the entrypoint to our custom script
ENTRYPOINT ["custom-entrypoint.sh"]
