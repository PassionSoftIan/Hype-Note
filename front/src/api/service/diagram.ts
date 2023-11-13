// 다이아그램 관련
import api from "../instances/api";

// 내 뇌 전체 조회
export const fetchDiagramAll = (userPk: number) => api.get(`diagram/${userPk}`);

// 친구 뇌 합치기
export const shareDiagram = async (userPk: number, members: Array<number>) => {
  const response = await api.post(`diagram/share/${userPk}`, members);
  return response.data;
};

// // 제목 수정
// export const renameTitle = (title: string) => {
//   api.put(`diagram/title`, { title });
// };
