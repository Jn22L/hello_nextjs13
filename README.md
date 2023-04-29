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
