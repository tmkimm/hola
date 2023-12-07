import styled from '@emotion/styled';

export const Skeleton = styled.div`
  width: 100%;
  padding: 0 15px;
  margin-top: 25px;
  height: 157px;
`;

export const Box = styled.div`
  width: 100%;
  padding-left: 15px;
  margin-top: 25px;
`;

export const List = styled.ul`
  display: flex;
  margin-top: 15px;
  gap: 10px;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Container = styled.li`
  flex: 0 0 auto;
  width: 210px;
  height: 120px;
  display: flex;
  padding: 15px 18px;
  flex-direction: column;
  gap: 8px;
  border-radius: 15px;
  border: 1px solid #ddd;
  background: #fff;
`;

export const Title = styled.h2`
  margin: 0;
  color: var(--black-primary, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.7px;
`;

export const ProjectTitle = styled.h2`
  height: 40px;
  margin: 0;
  color: var(--black-primary, #000);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.7px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
  overflow: hidden;
`;

export const Deadline = styled.div`
  width: fit-content;
  padding: 2px 8px;
  color: #ea726f;
  font-size: 10px;
  letter-spacing: -0.4px;
  border-radius: 20px;
  border: 1px solid #ea726f;
  font-weight: 600;
  line-height: normal;
`;

export const ViewCount = styled.div`
  color: #4e4e4e;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 10px */
  letter-spacing: -0.4px;
  text-align: end;
`;
