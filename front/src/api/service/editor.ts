//에디터 관련
import api from "../instances/api";

// 게시글 document 만들기
export const fetchCreateDocument = (userId: number) => {
  return api.post(`editor/${userId}`);
};

// 하위 document 만들기
export const fetchCreateCihldDocument = (userId: number, editorId: string) => {
  return api.post(`editor/child/${userId}`, {
    editorId,
  });
};

// 게시글 작성
export const fetchCreateNote = (editorId: string, title: string, content: string) => {
  api.post(`editor/write/${editorId}`, {
    title,
    content,
  });
};

// 게시글 연관관계 설정
export const fetchLinkNote = (userId: number, parentId: string, childId: string) => {
  api.post(`editor/relation/${userId}`, {
    parentId,
    childId,
  });
};

// 게시글 삭제
export const fetchDeleteNote = (editorId: string) => {
  api.delete(`editor/${editorId}`);
};

// 에디터 게시글 상세 조회
export const fetchNoteDetail = (editorId: string) => {
  return api.get(`editor/${editorId}`);
};

// 웹 서칭 검색결과 조회
export const fetchSearchResult = (query: string) => {
  const response = api.get("search/kakao", { params: { query } });
  return response;
};

// 내 문서 검색결과 조회
export const fetchSearchMyNote = (userPk: number, query: string | undefined) => {
  const response = api.get(`editor/search/${userPk}`, { params: { query } });
  return response;
};

// 게시글 목록 조회
export const fetchNoteList = (rootList: string[]) => {
  const data = { rootList: rootList };
  return api.post(`editor/list`, data);
};

// GPT 검색 결과
export const fetchGPT = (question: string) => {
  return api.post("gpt/chat", { question });
};

// UserRootList 조회
export const fetchUserRootList = () => {
  return api.get("auth/user-info");
};

// 공유 맴버 조회
export const fetchSharedMember = (editorList: string[]) => {
  const response = api.post(`editor/member`, { editorList });
  return response;
};

// 게시글 이미지 업로드
export const fetchEditorUploadImage = (file: File) => {
  const body = new FormData();
  body.append("multipartFile", file);

  return api.post("editor/upload", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
