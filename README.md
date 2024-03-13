#### 혼자 해보는 대규모 프로젝트(.with 패스트캠퍼스)

# React와 Javascript를 활용한 blog-app 만들기

- 본 프로젝트는 저의 실력향상 및 기초부터 천천히 다시 배워보고, 대규모 프로젝트를 혼자 만들어보기 위한 개인 프로젝트입니다.
- (주의) 패스트캠퍼스 강의를 통해 클론코딩및 학습을 할 예정이니 하나씩 천천히 배우고 올릴 예정이니 많이 늦을수 있습니다. 퐈이팅!!
- 개인 프로젝트이기 때문에 commit message와 pr, branch의 규칙을 따로 정하지 않았습니다. 참고 부탁드리겠습니다.
- Firebase를 활용한 프로젝트이고 되도록 많은 기능을 사용해볼 예정입니다.
- 베포 : Firebase
- [베포 주소](https://google.com) <= 클릭시 베포사이트로 넘어갑니다.(아직 베포가 되지않았습니다.)

## 프로젝트 설계

- 라우팅

  - / : 메인
  - /login : 로그인
  - /signUp : 회원가입
  - /profile : 프로필
  - /posts : 게시글
  - /posts/[id] : 게시글 상세페이지
  - /posts/new : 게시글 생성페이지
  - /posts/edit[id] : 게시글 수정페이지

  ```jsx
  <Routes>
    {isAuthenticated ? (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/new" element={<PostNew />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    ) : (
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Login />} />
      </>
    )}
  </Routes>
  ```

- 컴포넌트
  - <img src='https://github.com/LKJ970524/blog-app/assets/115642699/97446d80-3da6-44b6-9018-cf5f29d2fcb3' width=230 />
  <!-- 사진 다시 넣기 -->

- 프로젝트 설계
  - <img src="https://github.com/LKJ970524/blog-app/assets/115642699/e124a996-9480-43d8-a208-90f3c15cb7c1" width=230 />

  - src 폴더 안에 pages,component 관련 코드
  - components: 공통 컴포넌트
  - context : 사용자 인증, 다크모드 상태 관리
  - interface : 타입 인터페이스
  - pages : 페이지 코드(라우팅)
  - firebaseApp : firebase 설정
    <!-- 사진 다시 넣기 -->

</br>
</br>

### 프로젝트를 진행하며 정리한 블로그
#### React-router-dom에 대해

[블로그 주소](https://velog.io/@dlrbwjd97/React-router-dom)

</br>

#### 컴포넌트에 대해서

[블로그 주소](https://velog.io/@dlrbwjd97/React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)

</br>
</br>

### 트러블 슈팅

<br/>
<br/>

## 느낀점

기초부터 다시한번 천천히 앞으로 나아가며 놓친부분을 공부할 수 있었고 앞으로도 계속 부족한 부분을 채워 나가도록 노력할 것입니다.

<br/>
<br/>

## 프로젝트 사용법

- 패키지 설치

```
npm i 또는 npm install
yarn install
```

- 클라이언트 실행

```
npm run start
yarn start
```

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br />
