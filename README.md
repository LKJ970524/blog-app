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

### branch 별 작업(커밋 마다 코드가 있습니다.)

#### feature/2-2

- react-router-dom을 설치 및 적용시켰습니다

#### feature/2-3

- 프로젝트 구조 세팅 및 메인(홈) 작업 (스타일링 적용)
- 프로젝트 컴포넌트 작업 (프로필 및 게시글, 게시글 detail)
- 프로젝트 컴포넌트 Carousel 마크업 및 css 적용
- 프로젝트 컴포넌트 절대 경로 설정 및 적용

```json
tsconfig 파일
{
  "compilerOptions": {
    "baseUrl": "src",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "paths": {
    "pages/*": ["pages/*"],
    "components/*": ["components/*"]
  }
}
```

#### feature/2-4

- Firebase 세팅하기
- 로그인 페이지 세팅하기(마크업 및 css 적용)
- Route 적용(로그인과 비로그인 상태 구분하기)
- Firebase Auth 세팅
- [react-toastify](https://www.npmjs.com/package/react-toastify) 설치
- Firebase Auth를 사용하여 회원가입 기능 완성
- Firebase Auth를 사용하여 로그인 기능 완성
- Firebase Auth를 사용하여 로그아웃 기능 완성
- Context api로 사용자 정보 관리

```tsx
import { ReactNode, createContext, useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseAPP";

interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext({
  user: null as User | null,
});

export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(user);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
```

#### feature/2-5

- Firestore 세팅
- Firestore로 데이터 생성하기 게시글 폼 작업
- Firestore로 데이터 가져오기 게시글 리스트 작업
- Firestore로 데이터 가져오기 게시글 detail 작업

#### feature/2-6

- Firestore로 데이터 수정하기 게시글 수정 구현
- Firestore로 데이터 삭제하기 게시글 삭제 구현
- Firestore 쿼리 적용하기 내가 쓴 글 탭 구현
- Firestore 쿼리 적용하기 카테고리 탭 구현

#### feature/2-7

- Context Api로 다크모드 구현(다크모드 toggle 기능 구현)
- Context Api로 다크모드 구현(다크모드 toggle css 구현)

#### feature/2-8

- 댓글 폼 UI 구현
- 댓글 폼 작업(fireStore의 updateDoc, arrayUnion을 사용합니다.)
  - 문서 업데이트 : 전체 문서를 덮어쓰지 않고 문서의 일부 필드를 업데이트하려면 언어별 `update()` 메서드를 사용합니다.
  - 기존의 Posts에 comments라는 Array(배열)형태의 필드를 추가합니다.
  - 배열 요소 업데이트 : 문서에 Array(배열) 필드가 포함되어 있으면 `arrayUnion()`을 사용해 요소를 추가할 수 있습니다.
    - `arrayUnion()` : 배열에 없는 요소만 추가
  - firebase에 배열형태로 된 comments가 등록되는것을 확인했습니다.
- 댓글 리스트 작업
  - 더미 댓글리스트를 제거하고 fireStore에서 comments를 불러왔습니다
  - comments가 최신순으로 나열되게 만들었습니다.
- 댓글 삭제 작업(fireStore의 updateDoc, arrayRemove를 사용합니다.)
  - 배열 요소 업데이트 : 문서에 Array(배열) 필드가 포함되어 있으면 `arrayRemove()`을 사용해 요소를 삭제할 수 있습니다.
    - `arrayRemove()` : 배열에 없는 요소만 삭제

### 트러블 슈팅

- feature/2-5에서 게시글생성이 되지 않는 오류를 발견하였습니다.
  <img alt='에러내용' src='https://github.com/LKJ970524/blog-app/assets/115642699/f2faceb4-02f0-4e64-8980-9606060fcc6b' width=500px />

  - 해당 에러의 문제를 검색하고 알아본 결과

  ```js
  rules_version = '2';

  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if false;
      }
    }
  }
  ```

  해당 코드의 게시글을 작성하는 것이 전부 중지 되어있음을 확인했고 if false를 if true로 바꿔주었습니다. 이로써 게시글을 작성하는 것에는 이상이 없었지만 한가지 다른 문제점이 발견되었습니다. 바로 보안이 취약하다는점 이었고 이것을 다시한번 해결하기 위해 조건을 사용자가 로그인 되었을때만 작성 및 읽는 것이 가능하도록 변경 시켰습니다.

  ```js
  rules_version = '2';

  // Allow read/write access on all documents to any user signed in to the application
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
  ```

  출처 : [firebase 공식문서](https://firebase.google.com/docs/firestore/security/get-started?hl=ko#auth-required)

- feature/2-8에서 댓글생성이 되지 않는 오류를 발견하였습니다.
  <img alt='에러내용' src='https://github.com/LKJ970524/blog-app/assets/115642699/7004983d-4296-4990-b29a-b9ca766fcdec' width=500px />

  - 생성이 되지 않는 이유를 찾았고 너무 쉬운 문제였습니다. interface를 정의할때 post와 getPost를 같이 정의 했는데 Comments 컴포넌트에서 post만 사용하고 getPost는 사용하지 않아서 생긴 오류였습니다. 해결방법으로 getPost를 선언해주었습니다.
  ```tsx
  <Comments post={post} /> => <Comments post={post} getPost={getPost} />
  ```

<br/>
<br/>

## 느낀점

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
