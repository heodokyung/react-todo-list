import React from 'react';
import { CategoryType, ITodo, todoState } from '../atoms';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

interface TodoElementProps extends ITodo {
  onDragStart: (todoId: number) => void;
  onDragEnd: () => void;
}

const TodoItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 16px;
  border: 1px solid #e2e6ea;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
  word-break: break-word;
  cursor: grab;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  & + & {
    margin-top: 12px;
  }

  &:hover {
    border-color: #c7d2fe;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
    transform: translateY(-1px);
  }

  &:active {
    cursor: grabbing;
  }

  @media screen and (max-width: 640px) {
    display: block;
    padding: 14px;
  }
`;

const TextWrap = styled.div`
  min-width: 0;
  flex: 1;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  width: 178px;

  @media screen and (max-width: 640px) {
    width: 100%;
    justify-content: flex-start;
    margin-top: 12px;
  }
`;

const TodoButton = styled.button<{ $danger?: boolean }>`
  min-height: 32px;
  padding: 0 10px;
  border: 1px solid ${(props) => (props.$danger ? '#fecaca' : '#d6dbe1')};
  border-radius: 999px;
  background: ${(props) => (props.$danger ? '#fff7f7' : '#f8fafc')};
  color: ${(props) => (props.$danger ? '#b91c1c' : '#374151')};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${(props) => (props.$danger ? '#fca5a5' : '#9ca3af')};
    background: ${(props) => (props.$danger ? '#fee2e2' : '#eef2f7')};
  }
`;

const TimeText = styled.p`
  margin: 0 0 8px;
  color: #8a94a6;
  font-size: 13px;
  font-weight: 700;
`;

const TodoText = styled.p`
  margin: 0;
  color: #1f2933;
  font-size: 16px;
  line-height: 1.5;
`;

const TodoElement = ({ text, category, id, time, onDragStart, onDragEnd }: TodoElementProps) => {
  const setTodoList = useSetRecoilState(todoState);

  const updateTodo = (updateCategory: ITodo['category']) => {
    setTodoList((prevTodos) =>
      prevTodos.map((item) => {
        if (item.id === id) {
          return { ...item, category: updateCategory };
        }
        return item;
      }),
    );
  };

  const deleteTodo = () => {
    setTodoList((oldTodos) => oldTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoItem
      draggable
      onDragStart={() => onDragStart(id)}
      onDragEnd={onDragEnd}
      aria-label={`${text} 작업 카드`}
    >
      <TextWrap>
        <TimeText>{time}</TimeText>
        <TodoText>{text}</TodoText>
      </TextWrap>
      <ButtonWrap aria-label="작업 상태 변경">
        {category !== CategoryType.TO_DO && (
          <TodoButton onClick={() => updateTodo(CategoryType.TO_DO)} type="button">
            할일
          </TodoButton>
        )}
        {category !== CategoryType.DOING && (
          <TodoButton onClick={() => updateTodo(CategoryType.DOING)} type="button">
            진행중
          </TodoButton>
        )}
        {category !== CategoryType.DONE && (
          <TodoButton onClick={() => updateTodo(CategoryType.DONE)} type="button">
            완료
          </TodoButton>
        )}
        <TodoButton onClick={deleteTodo} type="button" $danger>
          삭제
        </TodoButton>
      </ButtonWrap>
    </TodoItem>
  );
};

export default React.memo(TodoElement);
