import { css } from '@emotion/css';
import { useForm } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { categoryState, todoState } from '../atoms';

interface IForm {
	todo: string;
}

const CreateTodo = () => {
	const makeTime = () => {
		const today = new Date();
		const year = today.getFullYear(); // 년도
		const month = today.getMonth() + 1; // 월
		const date = today.getDate(); // 날짜
		const hours = today.getHours(); // 시간
		const minutes = today.getMinutes(); // 분
		const seconds = today.getSeconds(); // 초
		const fullData = `${year}.${month}.${date} / ${hours}:${minutes}:${seconds}`;
		return fullData;
	};

	const { register, handleSubmit, setValue } = useForm<IForm>();
	const setTodoList = useSetRecoilState(todoState);

	// 값만 가져와 사용하 때는 useRecoilValue로 처리
	const category = useRecoilValue(categoryState);

	const hendelValid = ({ todo }: IForm) => {
		// setTodoList((oldTodo) => [{ text: todo, category: 'TO_DO' }, ...oldTodo]);
		// category는 축약형으로 category: category => category로 작성 가능

		setTodoList((oldTodo) => [
			{ text: todo, id: Date.now(), category, time: makeTime() },
			...oldTodo,
		]);
		setValue('todo', '');
	};

	return (
		<form
			onSubmit={handleSubmit(hendelValid)}
			className={css`
				height: 40px;
				width: 100%;
			`}
		>
			<input
				{...register('todo', {
					required: '할일 목록을 적어주세요!!',
				})}
				type='text'
				placeholder='할일 목록을 적어주세요!!'
				className={css`
					padding: 5px 10px;
					box-sizing: border-box;
					height: 100%;
					width: calc(100% - 75px);
				`}
			/>
			<button
				type='submit'
				className={css`
					padding: 4px;
					width: 70px;
					box-sizing: border-box;
					height: 100%;
					margin-left: 4px;
					vertical-align: top;
				`}
			>
				추가
			</button>
		</form>
	);
};

export default CreateTodo;
