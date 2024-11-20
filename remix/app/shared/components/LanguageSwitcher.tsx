import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button size="sm" variant="surface">
          {t("currentLanguage", { lng: i18n.language }) || "Language"}
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem onClick={() => handleLanguageChange("en")} value="en">
          {t("languages.english")}
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange("ko")} value="ko">
          {t("languages.korean")}
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange("variableName")}
          value="variableName"
        >
          {t("languages.variableName")}
        </MenuItem>
        {/* Add more languages as needed */}
      </MenuContent>
    </MenuRoot>
  );
};

export default LanguageSwitcher;
