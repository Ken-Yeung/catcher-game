#!/bin/sh

# Set up Redis configuration directory
mkdir -p /usr/local/etc/redis

# Dynamically generate Redis configuration and ACL files here, using environment variables
echo "aclfile /usr/local/etc/redis/custom_aclfile.acl" > /usr/local/etc/redis/redis.conf

# Generate ACL file using environment variables
echo "user $REDIS_USER on allkeys allchannels allcommands >$REDIS_PW" > /usr/local/etc/redis/custom_aclfile.acl

# Call the original Docker entrypoint script with redis-server and the path to the custom Redis configuration
exec docker-entrypoint.sh redis-server /usr/local/etc/redis/redis.conf
