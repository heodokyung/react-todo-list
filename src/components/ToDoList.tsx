import { useRecoilValue, useRecoilState } from 'recoil';
import { categoryState, CategoryType, todoSelector } from '../atoms';
import CreateTodo from './CreateTodo';
import TodoElement from './TodoElement';
import styled from 'styled-components';
import { css } from '@emotion/css';

// 1. react-hook-form 을 사용하지 않을 때 코드
/*
function ToDoList() {
  const [todo, setTodo] = useState('');

  const insertChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
  };

  const todoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
  };

  return (
    <div>
      <form onSubmit={todoSubmit}>
        <input
          type="text"
          value={todo}
          placeholder="Write a to do"
          onChange={insertChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
*/

const Wrapper = styled.article`
	max-width: 600px;
	margin: 0 auto;
`;

const FlexBox = styled.article`
	display: flex;
`;

const SelectBox = styled.select`
	margin-right: 10px;
`;

const Header = styled.h1`
	padding: 24px;
	font-size: 32px;
	border-radius: 4px;
	font-weight: bold;
	margin-bottom: 20px;
`;

export const colors = {
	default: '#222',
	white: '#fff',
};

function ToDoList() {
	// const todos = useRecoilValue(todoSelector);
	const todos = useRecoilValue(todoSelector);
	const [category, setCategory] = useRecoilState(categoryState);

	const onSelect = (event: React.FormEvent<HTMLSelectElement>) => {
		// 카테고리는 3가지 타입인데 넘겨받는 값은 String이기 때문에 as any로 타입스크립트 검사를
		setCategory(event.currentTarget.value as any);
	};

	return (
		<Wrapper>
			<Header
				className={css`
					background-color: ${colors['default']};
					color: ${colors['white']};
				`}
			>
				할 일 목록(To do List)
			</Header>

			<FlexBox>
				<SelectBox onChange={onSelect} value={category}>
					<option value={CategoryType.TO_DO}>할일</option>
					<option value={CategoryType.DOING}>진행중</option>
					<option value={CategoryType.DONE}>완료</option>
				</SelectBox>

				<CreateTodo />
			</FlexBox>

			<ul>
				{todos.map((item) => (
					// 아래의 코드와 동일, 전개연산자를 사용하지 않으면 해당 항목을 하나씩 나열해서 전달해야 함.
					// <TodoElement key={item.id} text={item.text} category={item.category} id={item.id} time={item.time}  />

					// 전개연산자로 props 전달, Props이 같고 사용하는 이름이 같기때문에 전개연산자로 Props가 가능합니다.
					<TodoElement key={item.id} {...item} />
				))}
			</ul>
		</Wrapper>
	);
}

// 2. react-hook-form 을 사용했을 때 코드
/******************************************************
 * 🔶 register : name, onBlur, onChange, onClick, ref를 return하는 함수
 * register를 사용할 때는 이름값을 같이 넘겨주어야 함.(주의:공백값을 넘기면 안됨.)
 * ex) x) register('user name') , (0) register('user_name'), register('userName')
 * 🔶 watch는 form의 입력값들의 변화를 관찰할 수 있게 해주는 함수 : onChange같은 역할
 * 🔶 handleSubmit : input 유효성 검사
 *  -첫번째 인자(필수): 데이터가 유효할 때 호출되는 함수
 *  -두번째 인자(필수X): 데이터가 유효하지 않을 때 호출되는 함수
 * 🔶 input의 유효성 검사하기
 * < input {...register("email",{required: true})} /> 라고 작성하고 input에 값을 적지 않고 내보내면
 * react-hook-form이 값이 유효한지(값이 있는지 없는지) 확인 후 오류가 있는 부분에 커서를 갖다준다.
 * < input {...register("email",{required: true, minLength: 10})} /> 쓰면 글자수도 확인해줌
 * 🔶setError: 발생하는 문제에 따라 추가적으로 에러를 설정할 수 있게 도와줌
 * 사용방법(예시):
 *  const {register, handleSubmit, formState:{errors},setError} = useForm< IForm >();
 *  setError("register의 name", {message: . . . }, { shouldFocus: true } )
 *  shouldFocus: 내가 고른 input 항목에 강제로 focus(커서 갖다대기)를 할 수 있음
 * 🔶validate: 내가 원하는 규칙으로 유효성 검사하기
 * validate(현재값) => { !value.includes("nico") || "error message"}
 * input 값에 nico가 포함되면 에러메세지 리턴
 ******************************************************/
/*
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'Password are not the same' },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline." });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/, //정규식에서 "."은 문자로 취급됩니다. naver.com => naveracom(pass) naverbcom(pass) 역슬래시를 붙여서 특수문자로 읽히도록 작성해주세요
              message: 'Only naver.com emails allowed',
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register('firstName', {
            required: 'write here',
            validate: {
              noNico: (value) =>
                value.includes('nico') ? 'no nicos allowed' : true,
              noNick: (value) =>
                value.includes('nick') ? 'no nick allowed' : true,
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register('lastName', { required: 'write here' })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register('username', { required: 'write here', minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register('password', { required: 'write here', minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register('password1', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Your password is too short.',
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button type="submit">Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
*/
export default ToDoList;
