FROM node:20 AS build-stage

# Increase Node's heap size to avoid OOM during build
ENV NODE_OPTIONS=--max_old_space_size=4096

WORKDIR /app

# Copy package definitions and install missing Babel plugin first
COPY package.json yarn.lock ./
# Add the missing dependency for "babel-preset-react-app"
RUN yarn add --dev @babel/plugin-proposal-private-property-in-object

# Install all dependencies (including devDependencies)
RUN yarn install --frozen-lockfile

# Copy the rest of the source code and build
COPY . .
RUN yarn run build

# --- Production stage ----------------------------------------------------
FROM nginx:latest

# Install specific version of libaom3, clean caches
RUN apt-get update \
    && apt-get install -y --no-install-recommends --allow-downgrades libaom3=3.6.0-1+deb12u1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from build-stage
COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]