# ✨Mergi - 개발자를 위한 프로젝트 팀원 매칭 사이트

<img src="https://github.com/user-attachments/assets/86c8265c-d6c0-43b8-8a17-d2553886c536" width="100%">

## 🤝 Introduce Project - 디지아너, 기획자, 개발자들의 연결고리!
- Mergi는 프로젝트 팀원을 구하는데 어려움을 겪는 사람들을 위해 만들어진 네트워킹 플랫폼입니다.
- Git에서 브랜치를 하나로 합치는 "Merge"처럼 개발자, 디자이너, 기획자가 하나의 팀으로 결합하여 새로운 프로젝트를 만들어나가는 과정을 지원합니다.
- 다양한 분야의 취업 준비생들이 협업 경험을 쌓고, 프로젝트를 진행할 수 있으며, 스타트업 및 소규모 팀에서 신뢰할 수 있는 사람들을 빠르게 찾아 팀워크의 결속력을 높이며, 성공적인 창업을 위한 기틀을 마련할 수 있습니다.
- 또한 스터디 매칭도 지원해 원하는 주제, 원하는 기술 스택을 공부하는 스터디 그룹을 모집하여 함께 공부하고 성장할 수 있는 기회를 제공할 수 있습니다.


## 🔄 Tech Stack Rebuild - Vue + Supabase → Next.js + TypeScript + Supabase
- <b>타입 안정성 확보</b> : TypeScript 도입으로 협업 시 버그를 줄이고 코드 품질을 높였습니다.
- <b>React 생태계 활용</b> : 풍부한 라이브러리와 커뮤니티 지원을 통해 확장성과 유지보수성을 강화했습니다.
- <b>파일 기반 라우팅</b> : Next.js의 직관적인 라우팅 구조로 개발 생산성과 유지보수성을 개선했습니다.


## 🚧 Rebuild Progress
- Vue → Next.js App Router 전환
- JavaScript → TypeScript 적용
- 기존 데이터베이스 구조 기반으로 Supabase 테이블 재구축
- Supabase API 레이어 재구현 및 RPC 타입 적용
- Entity / Insert / Update 타입 분리 및 타입 시스템 구축
- 공통 컴포넌트 구조 개선 및 재사용성 강화


## 📦 MERGI-NEXT-REBILD 프로젝트 구조
📦MERGI-NEXT-REBILD

├── 📦node_modules /   # 외부 라이브러리 및 의존성 패키지  
├── 📦public /         # 정적 파일 (이미지, 폰트, favicon 등)  
├── 📦src /  
│   ├── 📂app /        # Next.js App Router 기반 페이지 및 라우팅  
│   ├── 📂components / # 공통 UI 컴포넌트 및 모듈화된 UI 요소  
│   ├── 📂constants /  # 상수값, 옵션, 포지션/스킬 정의  
│   ├── 📂hooks /      # 커스텀 훅 (UI, 상태 관리, Supabase 관련)  
│   ├── 📂lib /        # Supabase 클라이언트, 서버 로직, 유틸 함수  
│   ├── 📂services /   # 비즈니스 로직 및 API 호출 레이어  
│   ├── 📂styles /     # 글로벌 스타일, 테마, SCSS 유틸리티  
│   └── 📂types /      # TypeScript 타입 정의 및 DB 타입  
├── 📜package.json    # 프로젝트 설정 및 의존성 관리  
├── 📜tsconfig.json   # TypeScript 설정 파일  
├── 📜next.config.js  # Next.js 환경 설정  
└── 📜.env            # 환경변수 (Supabase 키 등)


## 🗄️ Supabase Database Schema
<img width="1037" height="1465" alt="Group 224" src="https://github.com/user-attachments/assets/fb54878f-50a8-4a1b-9644-1a582648ffea" />



