import { css } from '@emotion/css';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { CategoryType, todoState } from '../atoms';

interface IForm {
  todo: string;
}

interface CreateTodoProps {
  category: CategoryType;
  label: string;
}

const getCreatedTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} / ${hours}:${minutes}`;
};

const CreateTodo = ({ category, label }: CreateTodoProps) => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setTodoList = useSetRecoilState(todoState);

  const handleValid = ({ todo }: IForm) => {
    const nextTodo = todo.trim();

    if (!nextTodo) {
      setValue('todo', '');
      return;
    }

    setTodoList((oldTodo) => [
      {
        text: nextTodo,
        id: Date.now(),
        category,
        time: getCreatedTime(),
      },
      ...oldTodo,
    ]);

    setValue('todo', '');
  };

  return (
    <form
      onSubmit={handleSubmit(handleValid)}
      className={css`
        display: flex;
        gap: 8px;
        width: 100%;
        margin-top: 16px;
      `}
    >
      <label
        htmlFor={`todo-input-${category}`}
        className={css`
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
        `}
      >
        {label} 항목 추가
      </label>
      <input
        id={`todo-input-${category}`}
        {...register('todo')}
        type="text"
        placeholder={`${label}에 추가할 작업`}
        className={css`
          min-width: 0;
          flex: 1;
          height: 42px;
          padding: 0 12px;
          border: 1px solid #d6dbe1;
          border-radius: 10px;
          background: #ffffff;
          color: #1f2933;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;

          &:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
          }
        `}
      />
      <button
        type="submit"
        className={css`
          width: 58px;
          height: 42px;
          border: 0;
          border-radius: 10px;
          background: #1f2937;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s ease;

          &:hover {
            background: #111827;
          }
        `}
      >
        추가
      </button>
    </form>
  );
};

export default CreateTodo;
