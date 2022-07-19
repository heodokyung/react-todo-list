import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

/*
Enum 은 enumerable의 약어로 열거형은 TypeScript가 제공하는 기능 중 하나입니다.
enum은 열거형으로 이름이 있는 상수들의 집합을 정의할 수 있습니다.
열거형을 사용하면 의도를 문서화 하거나 구분되는 사례 집합을 더 쉽게 만들수 있습니다. TypeScript는 숫자와 문자열-기반 열거형을 제공합니다.

기본값 : 별도로 특정값을 지정하지 않으면 열거형 값은 숫자값을 가지게 됩니다.

숫자 열거형 (Numeric enums)
enum Direction {
Up = 1,
Down,
Left,
Right,
}

문자열 열거형 (String enums)
enum Direction {
Up = "UP",
Down = "DOWN",
Left = "LEFT",
Right = "RIGHT",
}
등등..

https://www.typescriptlang.org/ko/docs/handbook/enums.html
*/

export enum CategoryType {
	'TO_DO' = 'TO_DO',
	'DOING' = 'DOING',
	'DONE' = 'DONE',
}

export interface ITodo {
	text: string;
	id: number;
	category: CategoryType.TO_DO | CategoryType.DOING | CategoryType.DONE;
	time: string;
}

export const categoryState = atom<
	CategoryType.TO_DO | CategoryType.DOING | CategoryType.DONE
>({
	key: 'selectState',
	default: CategoryType.TO_DO,
});

const { persistAtom } = recoilPersist({
	key: 'todoLocal',
	storage: localStorage,
});

export const todoState = atom<ITodo[]>({
	key: 'todo',
	default: [],
	// effects: [
	// 	({ setSelf, onSet }) => {
	// 		const todoStoreKey = 'Todo';
	// 		const savedValue = localStorage.getItem(todoStoreKey);
	// 		if (savedValue != null) {
	// 			setSelf(JSON.parse(savedValue));
	// 		}
	// 		onSet((newValue, _, isReset) => {
	// 			isReset
	// 				? localStorage.removeItem(todoStoreKey)
	// 				: localStorage.setItem(todoStoreKey, JSON.stringify(newValue));
	// 		});
	// 	},
	// ],
	effects_UNSTABLE: [persistAtom],
});

/*
Selectors :
Selector는 파생된 state(derived state)의 일부를 나타낸다.
즉, 기존 state를 가져와서, 기존 state를 이용해 새로운 state를 만들어서 반환할 수 있다. 기존 state를 이용만할 뿐 변형시키지 않는다. derived state는 다른 데이터에 의존하는 동적인 데이터를 만들 수 있기 때문에 강력한 개념이다.

const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
      return list.filter((item) => item.isComplete);

      case 'Show Uncompleted':
      return list.filter((item) => !item.isComplete);

      default:
      return list;
    }
  },
});

// filteredTodoListState는 내부적으로 2개의 의존성 todoListFilterState와 todoListState을 추적한다. 그래서 둘 중 하나라도 변하면 filteredTodoListState는 재 실행된다.

// https://recoiljs.org/ko/docs/basic-tutorial/selectors/
// https://recoiljs.org/ko/docs/api-reference/core/selector/
*/

export const todoSelector = selector({
	key: 'todoSelector',
	get: ({ get }) => {
		const todos = get(todoState);
		const category = get(categoryState);
		// 카테고리를 가져와서 필터로 해당 값만 반환
		return todos.filter((itme) => itme.category === category);
	},
});

// 1. CreateToDo 구성 요소는 양식을 만들고 해당 양식을 기반으로 내부에 데이터가 있는 toDoState 배열을 만듭니다.
// 2. ToDo 컴포넌트는 버튼으로 데이터를 렌더링합니다.
// 3. 사용자가 어떤 버튼을 누르느냐에 따라 toDoState 배열 항목의 'category' 속성이 변경됩니다.
// 3. Atom의 toDoSelector는 'category' 속성을 기반으로 항목을 3개의 배열로 구성합니다
// . 4. ToDoList는 카테고리 레이블이 있는 atom의 toDoSelector 배열에 있는 것을 렌더링합니다.
// 이게 도움이 되길 바란다!
