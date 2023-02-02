# AWS Lambda function for adding a new item

## The Frontend Repo is here: [Frontend Git Repo](https://github.com/grigoar/realstocks-simpleItems-frontend)

## You can open the application 🚀🚀[ON GITHUB PAGES](https://grigoar.github.io/realstocks-simpleItems-frontend/)

### Setting up the project

1. Clone the repository.
2. Create a new IAM user for having the right of creating new lambda functions.
3. Create a new Role for adding the policies for adding items in database and creating logs for the lambda function.
4. Create a dynamoDB database with the name "simpleItems".
5. Create a Lambda function with the name "simpleItem-create"(this is needed for the CI/CD deploy).
6. Create a gateway and create a POST method for the "simpleItem-create" function.
7. Add this variables in Github secrets for CI/CD - "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION"
