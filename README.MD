# Develop a new Github UI

Create a Github custom UI to display your repositories and your profile.
The website should have 3 views:
- The home page `/`
- The single repository page `/repositories/[id]`
- The profile page `/profile`

## Specifications

For each view you will display:
- `/`:
    - the list of all your repositories (paginated list with 5 repos per page).
    - a search form we can use to looking for a specific repository (basic name search query)
- `/repositories/[id]`: details of the repository such as:
    - The name
    - Languages used + the % of presence in the repository for each language (like the Language section in Github repository page)
    - The README (no need to format the markdown)
    - The number of commits
    - The number of stars
- `/profile`: details of your profile such as:
    - The amount of contributions in the last year
    - Your profile picture
    - Your profile description
    - An aggregation of all the languages used in all your repositories with the % of usage from 1 to 100%

You will add a short text to explain a part of the code you would like to highlight (because of the choice you've made, or because you think it is interesting to talk about it...)

BONUS POINT if you create a ready to use `docker-compose.yml` file to deploy the project on production.

## Stack

You will have to use:
- [TypeScript](https://www.typescriptlang.org)
- [React.js](https://reactjs.org) with [Next.js](https://nextjs.org)
- [Github GraphQL API](https://docs.github.com/en/graphql/overview/explorer)

You are free to do (and use) whatever you like for the design, the styling etc. Have fun trying things if you want!

## Recommendations

Here are some recommendations of some technologies you can use based on personnal experiences and/or on what we use on production.

For the GraphQL queries you can use these clients:
- [Apollo Client](https://www.apollographql.com/docs/reac)
- [URQL](https://formidable.com/open-source/urql) -> We are using this technology
- [React Query](https://react-query.tanstack.com) + [graphql-request](https://github.com/prisma-labs/graphql-request) -> We will use this soon in replacement of Urql

For the styling you can use [TailwindCSS](https://tailwindcss.com)

To help yourself with TypeScript and GraphQL, I strongly recommend you to use [graphql-code-generator](https://www.graphql-code-generator.com) with the plugin based on the GraphQL client you chose.

## Delivery

You will host the project publicly on Github or Gitlab and you will send me the link# GithubUI
# GithubUI
