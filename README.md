# React Todo App

## 사이트 설명

React와 Typescript를 적용하여 만든 Todo App입니다. 자신이 해야얄 일을 입력하면 입력한 할일의 목록이 리스트로 나타나고 입력한 할일을 상태에 따라 진행중, 완료, 삭제 중 선택하여 상태값을 변경할 수 있습니다. 해당 할일은 Recoil과 localStroge을 사용하여 리스트 내용을 저장하기 때문에 새로고침을 하더라도 사용자가 입력한 값이 사라지지 않고 유지돕니다.

## 사이트 바로가기

<a href="https://heodokyung.github.io/react-todo-list/" target="_blank">[토이프로젝트] Todo App (할 일 관리)</a>

## 적용기술

1.React  
2.TypeScript: 보다 정적인 코드(에러 방지)를 위해 Typescript를 적용하였습니다.  
3.react-hook-form을 사용하여 Form 입력 필드를 관리하였습니다.  
4.styled-components: 사이트의 스타일은 CSS-IN-JS로 적용하였습니다.  
5.recoil: 다크모드 값의 상태관리를 위해 Recoil을 사용하였습니다.  
- 5-1 : Recoil의 selector기능을 사용하여 각 상태(할일, 진행중, 완료)된 목록 리스트를 반환합니다.  
- 5-2 : Recoil로 'localStroge'에 사용자가 입력한 Todo 목록을 저장하였습니다.
6. Web, Mobile 모두 화면을 볼 수 있도록 미디어 쿼리를 이용하여 반응형으로 구현하였습니다.

![1](https://user-images.githubusercontent.com/50813871/179692925-73713de5-43a9-46c5-99d8-3a88559da3a0.gif)
![2](https://user-images.githubusercontent.com/50813871/179692936-4f4c9439-b5d3-46a4-9acd-f5aeb7ae6b5d.gif)
![3](https://user-images.githubusercontent.com/50813871/179692940-5b1ad76c-d096-4176-9fb3-e760aa378f4f.gif)
