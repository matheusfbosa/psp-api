# psp-api

A Nest.js project for a simplified Payment Service Provider (PSP). For more information, read [CHALLENGE.md](./CHALLENGE.md).

## Context

At its core, a PSP has two very important functions:

1. Allow our customers to process transactions ("cash-in").
2. Make payments of receivables to our customers ("cash-out").

## Dependencies

This project utilizes the following technologies and dependencies:

- [Node.js 20.9.0](https://nodejs.org/)
- [Nest.js](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Pino](https://getpino.io/)

Make sure to have these dependencies installed to successfully run the project.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

- Create transaction:

```bash
curl -X POST http://localhost:8080/api/v1/transactions \
-H "Content-Type: application/json" \
-d '{
    "userId": 1,
    "value": 1.99,
    "description": "Smartband XYZ 3.0",
    "paymentMethod": "debit_card",
    "cardNumber": "4111111145551142",
    "cardHolder": "Ozzy Osbourne",
    "cardExpiry": "12/23",
    "cvv": "737"
}'
```

- List transactions:

```bash
curl http://localhost:8080/api/v1/transactions
```

- Get application health:

```bash
curl http://localhost:8080/health
```

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure that the existing tests still pass.
4. Add new tests for any new features or changes you make.
5. Submit a pull request to the main repository.

Happy coding!

## Author

- [Matheus Bosa](https://www.linkedin.com/in/matheusfbosa/)
