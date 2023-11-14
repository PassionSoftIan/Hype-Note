"use client";

import LogoImg from "../../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DarkModeBtn from "./darkmode/DarkmodeBtn";
import Category from "./category/Category";
import { useAtom } from "jotai";
// import { userAtom } from "@/store/authAtom";
import { MyDocumentsAtom, SharedDocumentsAtom } from "@/store/documentsAtom";
import MySearch from "@/components/MySearch";
import { useNoteList } from "@/hooks/useNoteList";
import { useRouter } from "next/navigation";
import useCreateNote from "@/hooks/useCreateNote";
import useLinkNote from "@/hooks/useLinkNote";
import useGetUserInfo from "@/hooks/useGetUserInfo";
// import useGetUserInfo from "@/hooks/useGetUserInfo";

export default function Navbar() {
  const { createDocument } = useCreateNote();
  // const [user] = useAtom(userAtom);
  const [myDocuments] = useAtom(MyDocumentsAtom);
  const [sharedDocuments] = useAtom(SharedDocumentsAtom);
  const pathname = usePathname();
  const { noteList } = useNoteList();
  const router = useRouter();
  // const [myTreeNote, setMyTreeNote] = useState<childProps[]>([]);
  // const [sharedTreeNote, setsharedMyTreeNote] = useState<childProps[]>([]);
  const { LinkNote } = useLinkNote();
  const { data: user, isLoading, isError, error } = useGetUserInfo();
  // useGetUserInfo();

  const onClickHandler = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!user) {
      console.log("유저정보없다");
      return;
    }

    const userId = user.userPk;
    // const userId = 9;

    try {
      const documentId = await createDocument(userId);
      // @ts-ignore
      user.documentsRoots.push(documentId);
      router.push(`/editor/${documentId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("유저정보없다");
      return;
    }

    noteList.mutate({
      rootList: user.documentsRoots,
    });
    noteList.mutate({
      rootList: user.sharedDocumentsRoots,
    });
  }, [user]);

  if (pathname === "/signin" || pathname == "/signup" || pathname == "/") {
    return null;
  }

  return (
    <>
      {/* navbar */}
      <div className="z-50 sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[290px] overflow-y-auto text-center bg-primary text-secondary dark:bg-dark_primary scrollbar-hide">
        <div className="text-secondary text-xl">
          <div className="px-2.5 pt-2.5 pb-1 mt-1 flex items-start justify-between">
            <Link href="/main">
              <Image src={LogoImg} alt="우리로고" className="h-16 w-auto"></Image>
            </Link>
            <DarkModeBtn />
          </div>
          <h1 className="text-start text-font_primary text-[15px] ml-3">{`${user?.nickName}님, 안녕하세요`}</h1>
          {/* <div className="my-2 bg-gray-600 h-[1px]"></div> */}
          <br />
        </div>
        {/* <div className="w-[97%] mx-auto py-1.5 flex items-center rounded-lg duration-300 bg-[#FFFFFF] bg-opacity-75 text-dark_primary">
          <i className="bi bi-search text-sm"></i>
          <input
            type="text"
            placeholder="🔎 게시글을 검색하세요"
            className="w-full bg-transparent text-[15px] mx-3 focus:outline-none placeholder-gray-600"
          />
        </div> */}
        <MySearch />
        <Link href="/main">
          <div className="py-2 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-hover_primary hover:bg-opacity-50 dark:hover:bg-line_primary dark:hover:bg-opacity-50">
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-2 font-bold">노트 모아보기</span>
          </div>
        </Link>
        <Link href="/quiz">
          <div className="py-2 mb-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-hover_primary hover:bg-opacity-50 dark:hover:bg-line_primary dark:hover:bg-opacity-50">
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-2 font-bold">퀴즈</span>
          </div>
        </Link>
        {/* <div className="my-4 bg-gray-500 h-[1px]"></div> */}
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-1 bg-line_primary border-0"></hr>
          <span className="text-[13px] absolute px-3 text-gray-300 -translate-x-1/2 bg-[#2946A2] left-1/2  dark:bg-dark_primary">
            내 노트
          </span>
        </div>
        {/* 제일큰 노트 map으로 호출 */}
        {myDocuments &&
          myDocuments.map((element) => {
            return <Category childProps={element} value={1} key={element.id} depth={0} />;
          })}

        <div
          className="p-1.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-line_primary hover:bg-opacity-50 dark:hover:bg-line_primary dark:hover:bg-opacity-50"
          // onclick="dropdown()"
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] text-white" onClick={(event) => onClickHandler(event)}>
              + 페이지 추가
            </span>
          </div>
        </div>
        <br />
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-1 bg-line_primary border-0"></hr>
          <span className="text-[13px] absolute px-3 text-gray-300 -translate-x-1/2 bg-[#2946A2] left-1/2  dark:bg-dark_primary">
            공유받은 페이지
          </span>
        </div>
        {/* 공유받은 페이지 map으로 호출 */}
        {sharedDocuments &&
          sharedDocuments.map((element) => {
            return <Category childProps={element} value={2} key={element.id} depth={0} />;
          })}
        {/* <Link href="/signin">
          <h1 className="inline underline text-font_primary">signIn / </h1>
        </Link>
        <Link href="/signup">
          <h1 className="inline underline text-font_primary">signUp</h1>
        </Link> */}
      </div>
    </>
  );
}
