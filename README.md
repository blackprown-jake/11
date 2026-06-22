# FLOFIL — Landing Page (React + Vite + Tailwind)

OCTUD의 바이오메디컬 특수 필름 브랜드 **FLOFIL** 랜딩 페이지입니다.
React 18 + Vite 5 + Tailwind CSS 3 로 구성되어 있으며, Vercel/Netlify 에 그대로 배포할 수 있습니다.

## 폴더 구조

```
flofil-vite/
├─ index.html              # Vite 진입 HTML
├─ package.json            # 의존성 + 스크립트
├─ vite.config.js
├─ tailwind.config.js      # 브랜드 토큰 → Tailwind 유틸 매핑
├─ postcss.config.js
└─ src/
   ├─ main.jsx             # ReactDOM 렌더 진입점
   ├─ index.css            # 폰트(CDN) · 디자인 토큰 · 타이포 클래스 · Tailwind
   ├─ App.jsx              # 랜딩 페이지 전체
   └─ components/
      ├─ ui.jsx            # Button · Card · Tag · Divider · TextField · Icon · ImageSlot
      └─ icon-data.js      # 아이콘 글리프 데이터
```

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:5173
```

프로덕션 빌드:

```bash
npm run build    # dist/ 생성
npm run preview  # 빌드 결과 미리보기
```

## Vercel 배포

### 방법 A — GitHub 연동 (권장)
1. 이 폴더(`flofil-vite`)를 GitHub 저장소로 push
2. [vercel.com](https://vercel.com) → **Add New → Project** → 저장소 선택
3. Framework Preset 이 **Vite** 로 자동 감지됨 (Build: `npm run build`, Output: `dist`)
4. **Deploy** 클릭

### 방법 B — CLI
```bash
npm i -g vercel
vercel
```

### CodeSandbox
- **Create Sandbox → Import from GitHub** 또는 파일을 그대로 붙여넣으면 Vite 템플릿으로 즉시 실행됩니다.

## 참고 사항

- **폰트**: 브랜드 서체 Wanted Sans + Pretendard 를 `src/index.css` 상단에서 CDN(`jsdelivr`)으로 불러옵니다. 운영 환경에서는 self-host 를 권장합니다.
- **이미지**: `ImageSlot` 은 자리표시자입니다. 실제 제품 사진은 `<ImageSlot src="/your-image.jpg" />` 처럼 `src` 를 넘기거나 `<img>` 로 교체하세요.
- **회원가입/로그인**: 현재는 UI 만 구현된 상태로, 입력값이 저장되지 않습니다. 실제 인증·DB 연동은 Supabase / Firebase 등을 붙여야 합니다 (`AuthModal` 컴포넌트의 onClick 핸들러에 연결).
- **디자인 토큰**: 색상·타이포는 Wanted Design System 값을 `src/index.css` 의 CSS 변수로 고정해 두었습니다. 색을 바꾸려면 `:root` 의 `--wt-*` 변수만 수정하면 전체에 반영됩니다.
