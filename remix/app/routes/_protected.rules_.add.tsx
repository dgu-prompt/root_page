// src/routes/rules.tsx
import { useEffect, useState } from "react";
import ConfigAlert from "~/components/config/alert/configalert";

// 임시 데이터 (나중에 API 또는 DB 연결 가능)

export default function Add() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // 클라이언트 렌더링이 완료될 때까지 기다림

  return (
    <>
      <ConfigAlert></ConfigAlert>
    </>
  );
}
