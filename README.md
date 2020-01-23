# Cooking Pay

## Todo
[x] React App Init.
[x] Styles - styled-components.
[x] Router Component.
[x] Login Form.
[x] ApolloProvider, AppProvider - AppMessage, AppProgress.
[x] Bug Fixed.
[x] Progress - form disabled onChange.
[x] HOC - Apollo Local Resolvers - LoggedIn,LoggedOut.
[x] Codegen.
[x] UserProvider - Logout, GetMyProfile, NavBar
[x] Navbar.
[x] Post - Tabs(View,Write), TopTitle, GlobalStyles - row
[x] Navbar - Mobile
[x] Post - fileUpload(Drag - Drop / Click)
[x] Post - Preview

## Todo <예정사항>
[] Post 자세히 보기.
[] Post 분류별 보기로 나눠놓기.
[] 파일 업로드.
[] 기부하기.
[] Post.
[] User Create Post.
[] User Donate.
[] Manager Check Others.




## Install
1. yarn create react-app ./ --template typescript
2. yarn add react-router-dom @types/react-router-dom
3. yarn add styled-components @types/styled-components
4. yarn add graphql apollo-boost react-apollo apollo-client
5. yarn add @apollo/client   
: Apollo v.3.0부터 변경됨. - InmemoryCache, ApolloClient  
: * 참고 https://www.apollographql.com/docs/react/v3.0-beta/data/local-state/
: 하지만 라이브러리 의존성문제인지 ApolloProvider에 대한 에러가 뜸.
: 다시 react-apollo로 변경하여 사용함.
6. yarn add apollo 
7. yarn add apollo-link-http apollo-link apollo-cache-inmemory
8. yarn add axios
N. yarn add antd


### 1. Study
[1-0] fragment 사용시
: Fragment를 여러개 사용시 하나의 테이블을 독립적으로 사용하도록 해야함.
: 하나의 테이블의 종류를 분리사용하는것 가능함.
: 두개의 테이블의 Fragment를 구성하면 실행 안됨.


<!-- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->
