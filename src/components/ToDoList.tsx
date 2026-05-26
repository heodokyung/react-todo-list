import { useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CategoryType, ITodo, todoSelector, todoState } from '../atoms';
import CreateTodo from './CreateTodo';
import TodoElement from './TodoElement';
import styled from 'styled-components';

const CATEGORY_COLUMNS: Array<{
  category: CategoryType;
  label: string;
  description: string;
}> = [
  {
    category: CategoryType.TO_DO,
    label: '할일',
    description: '아직 시작하지 않은 작업',
  },
  {
    category: CategoryType.DOING,
    label: '진행중',
    description: '지금 처리하고 있는 작업',
  },
  {
    category: CategoryType.DONE,
    label: '완료',
    description: '마무리된 작업',
  },
];

const Wrapper = styled.main`
  width: min(100% - 32px, 1180px);
  margin: 0 auto;
  padding: 42px 0 56px;

  @media screen and (max-width: 640px) {
    width: min(100% - 24px, 1180px);
    padding: 26px 0 40px;
  }
`;

const Header = styled.header`
  padding: 28px;
  border: 1px solid #e2e6ea;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
`;

const HeaderKicker = styled.p`
  margin: 0 0 10px;
  color: #64748b;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  color: #111827;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  letter-spacing: -0.04em;
`;

const HeaderDescription = styled.p`  
  margin: 14px 0 0;
  color: #5f6b7a;
  font-size: 16px;
  line-height: 1.65;
`;

const SummaryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
`;

const SummaryItem = styled.li`
  padding: 8px 12px;
  border: 1px solid #e2e6ea;
  border-radius: 999px;
  background: #f8fafc;
  color: #374151;
  font-size: 14px;
  font-weight: 800;
`;

const Board = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 22px;

  @media screen and (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.article<{ $isActive: boolean }>`
  min-height: 360px;
  padding: 18px;
  border: 1px solid ${(props) => (props.$isActive ? '#2563eb' : '#e2e6ea')};
  border-radius: 20px;
  background: ${(props) => (props.$isActive ? '#eff6ff' : '#f8fafc')};
  box-shadow: ${(props) => (props.$isActive ? '0 12px 28px rgba(37, 99, 235, 0.12)' : 'none')};
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid #e2e6ea;
`;

const ColumnTitle = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 21px;
  font-weight: 800;
`;

const ColumnDescription = styled.p`
  margin: 7px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.45;
`;

const CountBadge = styled.span`
  display: inline-flex;
  min-width: 34px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #111827;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
`;

const TodoItems = styled.ul`
  min-height: 156px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
`;

const EmptyState = styled.div`
  display: grid;
  min-height: 132px;
  place-items: center;
  margin-top: 16px;
  border: 1px dashed #cbd5e1;
  border-radius: 16px;
  background: #ffffff;
  color: #8a94a6;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  line-height: 1.55;
`;

const HelpText = styled.p`
  margin: 16px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
`;

function ToDoList() {
  const [todos, doing, done] = useRecoilValue(todoSelector);
  const setTodoList = useSetRecoilState(todoState);
  const [draggedTodoId, setDraggedTodoId] = useState<number | null>(null);
  const [activeDropCategory, setActiveDropCategory] = useState<CategoryType | null>(null);

  const todosByCategory = useMemo<Record<CategoryType, ITodo[]>>(
    () => ({
      [CategoryType.TO_DO]: todos,
      [CategoryType.DOING]: doing,
      [CategoryType.DONE]: done,
    }),
    [todos, doing, done],
  );

  const totalCount = todos.length + doing.length + done.length;

  const moveTodoToCategory = (todoId: number, nextCategory: CategoryType) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, category: nextCategory };
        }
        return todo;
      }),
    );
  };

  const handleDragStart = (todoId: number) => {
    setDraggedTodoId(todoId);
  };

  const handleDragEnd = () => {
    setDraggedTodoId(null);
    setActiveDropCategory(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>, category: CategoryType) => {
    event.preventDefault();
    setActiveDropCategory(category);
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>, category: CategoryType) => {
    event.preventDefault();

    if (draggedTodoId !== null) {
      moveTodoToCategory(draggedTodoId, category);
    }

    handleDragEnd();
  };

  return (
    <Wrapper>
      <Header>
        <HeaderKicker>Kanban Todo</HeaderKicker>
        <HeaderTitle>할 일 목록</HeaderTitle>
        <HeaderDescription>
          작업을 상태별로 나누어 관리합니다. 각 칸에서 바로 작업을 추가하고, PC에서는 카드를 드래그해서 다른 상태로 옮길 수 있습니다.
        </HeaderDescription>
        <SummaryList aria-label="작업 요약">
          <SummaryItem>전체 {totalCount}</SummaryItem>
          {CATEGORY_COLUMNS.map((column) => (
            <SummaryItem key={column.category}>
              {column.label} {todosByCategory[column.category].length}
            </SummaryItem>
          ))}
        </SummaryList>
      </Header>

      <HelpText>
        PC에서는 카드를 원하는 칸으로 끌어 놓아 상태를 바꿀 수 있습니다. 모바일에서는 카드 안의 상태 버튼을 사용하세요.
      </HelpText>

      <Board aria-label="할 일 칸반 보드">
        {CATEGORY_COLUMNS.map((column) => {
          const columnTodos = todosByCategory[column.category];
          const isActive = activeDropCategory === column.category;

          return (
            <Column
              key={column.category}
              $isActive={isActive}
              onDragOver={(event) => handleDragOver(event, column.category)}
              onDragLeave={() => setActiveDropCategory(null)}
              onDrop={(event) => handleDrop(event, column.category)}
              aria-label={`${column.label} 목록`}
            >
              <ColumnHeader>
                <div>
                  <ColumnTitle>{column.label}</ColumnTitle>
                  <ColumnDescription>{column.description}</ColumnDescription>
                </div>
                <CountBadge>{columnTodos.length}</CountBadge>
              </ColumnHeader>

              <CreateTodo category={column.category} label={column.label} />

              {columnTodos.length > 0 ? (
                <TodoItems>
                  {columnTodos.map((item) => (
                    <TodoElement
                      key={item.id}
                      {...item}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </TodoItems>
              ) : (
                <EmptyState>
                  아직 작업이 없습니다.
                  <br />이 칸에서 바로 추가하거나 다른 카드를 옮겨보세요.
                </EmptyState>
              )}
            </Column>
          );
        })}
      </Board>
    </Wrapper>
  );
}

export default ToDoList;
