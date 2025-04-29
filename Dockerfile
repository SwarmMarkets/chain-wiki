# Use official Node.js image (you can change the version if needed)
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first (for better caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app's code
COPY . .

# Copy your .env file (only if needed inside container, usually bind mount is better)
# COPY .env .env

# Expose the port (if your app uses a specific port, replace 3000)
EXPOSE 3000

# Start the application
CMD ["yarn", "run", "start"]