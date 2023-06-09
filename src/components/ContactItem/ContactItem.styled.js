import styled from '@emotion/styled';

export const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

export const DeleteButton = styled.button`
  border: none;
  background-color: #ff6b6b;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f44336;
  }
`;
