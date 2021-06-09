# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## graphql-code-generator

## 公式 Docs

https://www.graphql-code-generator.com/

## Installation

```
npm install --save graphql

npm install --save-dev @graphql-codegen/cli

npm install --save-dev @graphql-codegen/typescript

npm i @graphql-codegen/typescript-react-apollo
```

add `package.json`
これを追加することで`npm run generate`コマンドが使えるようになる。

```
{
  "scripts": {
    "generate": "graphql-codegen"
  }
}
```

make `codegen.yml`

ex.

```
schema: http://localhost:3000/graphql // バックエンド側にしているエンドポイントをschemeに使用する。
documents: ./graphql/queries/*.graphql // documentsにはqueryやmutationを記載
generates:
  ./src/types.d.ts: // 型のファイルをどこに作成するか
    plugins:
      - typescript
      - typescript-operations
```

`users.graphql`を編集。
ex.

```
query {
  users {
    id
    nickname
    email
    passwordDigest
    posts {
      id
      title
      content
      userId
      createdAt
    }
  }
}
```

`types.d.ts`を生成

```
npm run generate
```

query に名前をつけないと下記のように生成された型が unnamed になってしまう。

```
export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never }>;

export type Unnamed_1_Query = { __typename?: "Query" } & {
  users: Array<
    { __typename?: "User" } & Pick<
      User,
      "id" | "nickname" | "email" | "passwordDigest"
    > & {
        posts: Array<
          { __typename?: "Post" } & Pick<
            Post,
            "id" | "title" | "content" | "userId" | "createdAt"
          >
        >;
      }
  >;
};
```

`users.graphql`のクエリ名前つけるように編集。

```
query users {
  users {
    id
    nickname
    email
    passwordDigest
    posts {
      id
      title
      content
      userId
      createdAt
    }
  }
}

```

生成された`types.d.ts`に名前がついている。

```
export type UsersQueryVariables = Exact<{ [key: string]: never; }>;

export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'nickname' | 'email' | 'passwordDigest'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'content' | 'userId' | 'createdAt'>
    )> }
  )> }
);
```
