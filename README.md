# Pay your name

## Quick setup
- Clone the repository with 
```
  git clone https://github.com/joaodacolsoares/payyourname.git
```

- Install all the dependencies with the command:
```
  yarn
```
- Set up Postgres
- Set all the ENV variables based on the `.env.template` file

## Run locally
To run the service just run the command below:
```
  yarn dev
```


## Prisma

Because Prisma Client is tailored to your own schema, you need to update it every time your Prisma schema file is changing by running the following command:

```
npx prisma generate
```

To create a new migration by changing the Schema you can run the command:
```
prisma migrate dev --name ${MIGRATION_NAME}
```

## Run webhook locally
To run the proxy of the webhook to your localhost you need to follow the steps below:

- Download Stripe CLI
- Login in Stripe CLI
- Run the following command pointing to the Next web server port
```
stripe listen --forward-to localhost:${NEXT_SERVER_PORT}/api/create-nickname
```
- Set the STRIPE_WEBHOOK_SECRET based on the secret that will appear in the top of the console when running the command above.