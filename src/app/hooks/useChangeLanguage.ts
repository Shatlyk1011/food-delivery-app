import { usePathname, useRouter } from "@/i18n/routing";
import atoms from "@/app/(pages)/_providers/jotai";
import { useAtom } from "jotai";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const useChangeLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(atoms.selectedLanguage);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as I18N;

  const handleChange = (locale: I18N) => {
    if (locale !== selectedLanguage) {
      setSelectedLanguage(locale);
      router.replace(pathname, { locale });
    }
  };

  useEffect(() => {
    handleChange(locale);
  }, []);

  const languageTitle = (() => {
    switch (selectedLanguage) {
      case "tk": {
        return "Turkmen";
      }
      case "en": {
        return "English";
      }
      default:
        return "Русский";
    }
  })();

  return { handleChange, languageTitle };
};

export default useChangeLanguage;
