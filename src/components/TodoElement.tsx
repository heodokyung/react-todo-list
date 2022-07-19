import React from 'react';
import { CategoryType, ITodo, todoState } from '../atoms';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { css } from '@emotion/css';

//  스타일링
const TodoItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	word-break: break-all;
	border-bottom: 1px solid #666;
	&:first-of-type {
		margin-top: 20px;
		border-top: 3px solid #222;
	}
`;

const TextWrap = styled.div`
	width: calc(100% - 190px);
	@media screen and (max-width: 640px) {
		width: calc(100% - 80px);
	}
`;

const ButtonWrap = styled.div`
	width: 175px;
	text-align: right;
	@media screen and (max-width: 640px) {
		width: 72px;
		margin-left: 8px;
	}
`;

const TodoButton = styled.button`
	padding: 5px 10px;
	border-radius: 4px;
	border: 1px solid #ccc;
	font-size: 14px;
	& + & {
		margin-left: 5px;
	}
	@media screen and (max-width: 640px) {
		width: 100%;
		& + & {
			margin: 5px 0 0 0;
		}
	}
`;
const TextContent = styled.p<{ fontSize: string }>`
	font-size: ${(props) => props.fontSize};
	& + & {
		margin-top: 10px;
	}
`;

//  Todo 시작
const TodoElement = ({ text, category, id, time }: ITodo) => {
	const setTodoList = useSetRecoilState(todoState);

	/*
		1) 수정(상태변경), 삭제의 이벤트 발생시 해당 요소가 어디에 있는지 알아야 함.
		2) 상태의 불변성을 유지해서 상태값을 수정
	*/

	// 수정 => 매개변수로 전달받은 상태값으로 (TO_DO, DOING, DONE) 할 일 상태값 변경
	const updateTodo = (updateCategory: ITodo['category']) => {
		// 방법 1 : findIndex 이용
		/*
		1) 해당 target의 위치는 id값으로 위치 확인 => findIndex를 사용
    -> findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환함,  만족하는 요소가 없으면 -1을 반환
		(참고:인덱스 대신 값을 반환하는 find() 메서드도 참고)

		예시)
		const array1 = [5, 12, 8, 130, 44];
		const isLargeNumber = (element) => element > 13;
		console.log(array1.findIndex(isLargeNumber));
		결과 :  expected output: 3

		2) oldTodos.findIndex((itme) => itme.id === id
		실제 배열에서의 Item의 id와 props에서 온 id가 같은지 비교.

		3) 수정 방법 : target값을 '수정'으로 변경 (위치의 인덱스 값으로 확인)
		4) slice를 이용하여 해당 배열을 자름 => \

		4-1) splice => side effect : 원래 array가 변형되고 삭제된 elements를 return 함
		4-2) slice => no side effect : 원래 array를 복제해 행해지고 결과물을 return 함
		// react로 저장한 state들은 직접적으로 수정할 수 없기때문에 늘 setter함수를 사용해야 함, 그래서 splice 같은 side effectr가 있는 함수를 사용할 때에는 복제해서 사용해야 함

		예시코드)
		변경해야 하는 타켓 위치 => const targetIndex = 1

		const 원본  = ['a', 'target', 'c', 'd', 'e']

		1) 원본.slice(0, targetIndex)  => ['a']
		2) 원본.slice(targetIndex + 1) => [ 'c', 'd', 'e']
		const 최종 = [...원본.slice(0, targetIndex), '수정', ...원본.slice(targetIndex + 1)]
		const 최종 = ['a', '수정', 'c', 'd', 'e']
		*/

		// 실제 적용 코드
		/*
		setTodoList((oldTodos) => {
			const targetIndex = oldTodos.findIndex((itme) => itme.id === id);

			const newTodo = { text, id, category: updateCategory, time };
			return [
				...oldTodos.slice(0, targetIndex),
				newTodo,
				...oldTodos.slice(targetIndex + 1),
			];
		});
		*/

		// 방법2
		// map도 기본적으로 새로운 배열을 만들어 반환하는 메소드이기 떄문에 아래 방법이 더 간결
		setTodoList((prevTodos) =>
			prevTodos.map((item) => {
				if (item.id === id) {
					return { text, id, category: updateCategory, time };
				}
				return item;
			}),
		);
	};

	// 삭제
	// 방법1
	/*
	const deleteTodo = () => {
		setTodoList((oldTodos) => {
			const targetIndex = oldTodos.findIndex((itme) => itme.id === id);
			return [
				...oldTodos.slice(0, targetIndex),
				...oldTodos.slice(targetIndex + 1),
			];
		});
	};
	*/

	// 방법2
	const deleteTodo = () => {
		setTodoList((oldTodos) => {
			const newToDos = oldTodos.filter((todo) => todo.id !== id);
			return newToDos;
		});
	};

	return (
		<TodoItem>
			<TextWrap>
				<TextContent fontSize={'14px'}>{time}</TextContent>
				<TextContent fontSize={'18px'}>{text}</TextContent>
			</TextWrap>
			<ButtonWrap>
				{/*
				1) && 연산자를 이용하여  조건이 충족되면 '&&' 뒤에 오는 부분을 수행 =>
				2) 해당 조건이 아닐때만 버튼이 노출됨 =>
					ex) 할일 카테고리 일 때는 할일버튼 비노출
					ex) 완료 카테고리 일 때는 완료버튼 비노출
				3) 삭제 버튼은 항상 노출
				*/}
				{category !== CategoryType.TO_DO && (
					<TodoButton
						onClick={() => updateTodo(CategoryType.TO_DO)}
						type='button'
					>
						할일
					</TodoButton>
				)}
				{category !== CategoryType.DOING && (
					<TodoButton
						onClick={() => updateTodo(CategoryType.DOING)}
						type='button'
					>
						진행중
					</TodoButton>
				)}
				{category !== CategoryType.DONE && (
					<TodoButton
						onClick={() => updateTodo(CategoryType.DONE)}
						type='button'
					>
						완료
					</TodoButton>
				)}
				<TodoButton onClick={deleteTodo} type='button'>
					삭제
				</TodoButton>
			</ButtonWrap>
		</TodoItem>
	);
};

export default React.memo(TodoElement);
