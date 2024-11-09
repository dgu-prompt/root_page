import i18n, { use } from "i18next";
import { initReactI18next } from "react-i18next";

// 개별 JSON 파일 불러오기
import enApp from "./locales/en/app.json";
import enDashboard from "./locales/en/dashboard.json";
import koApp from "./locales/ko/app.json";
import koDashboard from "./locales/ko/dashboard.json";

// 언어 리소스를 병합하는 함수
const resources = {
  en: {
    translation: {
      ...enApp,
      ...enDashboard,
    },
  },
  ko: {
    translation: {
      ...koApp,
      ...koDashboard,
    },
  },
};

// i18next 설정
use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
