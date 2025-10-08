# Getting Started

## Prerequisites

You should have these application installed:
- Docker
    - Docker Compose
- npm


## Run Wordpress locally via Docker Compose

Run:

```
docker compose -f docker-compose.yml -p wordpress up
```

If everything goes well you should be able to access the Wordpress installation at `http://localhost`.

## Update plugin

Now that you have the Wordpress installation run:

```
cd wp-content/plugins/onesoftway-pricing-table
npm start
```

This will update and deploy the plugin automatically in the local Wordpress deployment.

## Package plugin

You can package the plugin and create a zip file by running:

```
cd wp-content/plugins/onesoftway-pricing-table
npm plugin-zip
```