install:
	npm install

build:
	npm run build

docker-local-up:
	docker compose -f docker-compose.local.yml up -d

docker-local-down:
	docker compose -f docker-compose.local.yml down

prisma-studio:
	npx prisma studio

format:
	npm run format

lint:
	npm run lint

start:
	npm run start

start-dev:
	npm run start:dev

start-prod:
	npm run start:prod

.PHONY: test
test:
	npm run test

test-e2e:
	npm run test:e2e

test-cov:
	npm run test:cov

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Available targets:"
	@echo "  install         	- Install project dependencies"
	@echo "  build           	- Compile the project"
	@echo "  docker-local-up	- Start Docker containers for local environment"
	@echo "  docker-local-down	- Stop and remove Docker containers for local environment"
	@echo "  prisma-studio		- Open Prisma ORM Studio"
	@echo "  format          	- Apply code formatting"
	@echo "  lint            	- Run code linter"
	@echo "  start           	- Start the application in production mode"
	@echo "  start-dev       	- Start the application in development mode"
	@echo "  start-prod      	- Start the application in production mode"
	@echo "  test            	- Run unit tests"
	@echo "  test-e2e        	- Run end-to-end tests"
	@echo "  test-cov        	- Run coverage tests"
	@echo "  help            	- Display this help message"
