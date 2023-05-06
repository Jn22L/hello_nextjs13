## Next.js 13 게시판 만들기

- front/back : Next.js Full Stack
- db : mongodb, mariadb
- DB설정: .env.local (commit 제외)

## 문제

1. app/lib 접근이 안되는 문제
2. 하위 페이지에서 root 접근시 @/ 가 안먹는 문제

   -> 1,2 번 모두 jsconfig.json 절대경로 설정하여 해결

```
// jsconfig.json 절대경로 설정하기
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./app/*"]
    }
  }
}
```

3. 수정후 재조회시, 수정전 내용이 보이는 문제  
   -> 캐시에서 계속 읽어오는듯 ... 효율적인 해결방법은 ?

   원인 : static rendering 되고 있음.  
   확인방법은 npm run build 하여 Route 를 보면됨  
   ○ : static rendering  
   λ : dynamic renering

   static rendering 은 npm run build 한 결과를 계속 뿌려주니까  
   새로운 글을 써도 목록이 추가되지 않는것임

```
npm run build

Route (app)                                Size     First Load JS
┌ ○ /                                      181 B          74.4 kB
├ ○ /mongodb-list                     1.22 kB        75.4 kB

mongodb-list 페이지가 static rendering 되고 있다 (0)
```

해결 : 페이지 상단에 다음을 추가

`export const dynamic = "force-dynamic"`

다시 npm run build 해보면 다이나믹 렌더링으로 변경됨을 알 수 있다.

```
npm run build

Route (app)                                Size     First Load JS
┌ ○ /                                      181 B          74.4 kB
├ λ /mongodb-list                          1.22 kB        75.4 kB
```

4. export const revalidate = 0 했는데 계속 캐시에서 가져오는 문제

- 아직 next.js 의 버그인듯 함
- 참조: https://github.com/vercel/next.js/discussions/42290
