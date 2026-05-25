# React Todo List

React와 TypeScript로 만든 칸반형 할 일 관리 앱입니다.  
작업을 `할일`, `진행중`, `완료`로 나누어 관리하고, 입력한 내용은 Recoil Persist를 통해 브라우저에 저장됩니다.

## Demo

- [GitHub Pages 바로가기](https://heodokyung.github.io/react-todo-list/)

## 주요 기능

| 기능 | 설명 |
|---|---|
| 상태별 작업 관리 | 할일, 진행중, 완료 세 칸으로 작업을 분리합니다. |
| 컬럼별 작업 추가 | 원하는 상태 칸에서 바로 새 작업을 추가할 수 있습니다. |
| 드래그 이동 | PC에서 작업 카드를 다른 칸으로 드래그해 상태를 변경할 수 있습니다. |
| 버튼 이동 | 모바일에서도 버튼으로 상태를 변경할 수 있습니다. |
| 로컬 저장 | Recoil Persist로 새로고침 후에도 작업 목록을 유지합니다. |
| 반응형 UI | PC는 칸반 보드, 모바일은 세로 목록으로 전환됩니다. |

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| State | Recoil, recoil-persist |
| Form | react-hook-form |
| Style | styled-components, Emotion CSS |
| Deploy | GitHub Actions, GitHub Pages |

## 로컬 실행

```bash
npm install
npm start
```

## 빌드

```bash
npm run build
```

GitHub Pages 배포용 빌드는 GitHub Actions에서 자동으로 실행됩니다.

```bash
npm run build:pages
```

## 배포 방식

이 프로젝트는 기존 `gh-pages` 패키지 배포 방식 대신 GitHub Actions Pages 배포 방식을 사용합니다.

```txt
main 브랜치 push
→ GitHub Actions 실행
→ TypeScript 검사
→ React production build
→ GitHub Pages 배포
```

GitHub 저장소 설정에서 아래 항목을 확인해야 합니다.

```txt
Settings → Pages → Build and deployment → Source: GitHub Actions
Settings → Environments → github-pages → main 브랜치 허용
```

## 프로젝트 구조

```txt
src/
├─ App.tsx
├─ atoms.ts
├─ components/
│  ├─ CreateTodo.tsx
│  ├─ TodoElement.tsx
│  └─ ToDoList.tsx
├─ index.tsx
├─ styled.d.ts
└─ theme.ts
```

## 개선 내용

- 빈 칸도 항상 보이도록 칸반 보드 구조를 정리했습니다.
- 새 작업이 무조건 첫 번째 칸에만 들어가던 문제를 개선했습니다.
- 각 칸에서 바로 작업을 추가할 수 있게 변경했습니다.
- PC에서는 드래그로 상태를 변경할 수 있게 보강했습니다.
- 모바일에서는 기존처럼 버튼으로 상태를 변경할 수 있습니다.
- 전체 CSS를 흰색 카드와 회색 배경 중심으로 정리했습니다.
- GitHub Pages 배포를 GitHub Actions 방식으로 전환했습니다.
