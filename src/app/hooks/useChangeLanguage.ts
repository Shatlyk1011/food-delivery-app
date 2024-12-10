import { usePathname, useRouter } from "@/i18n/routing";
import atoms from "@/app/(frontend)/_providers/jotai";
import { useAtom } from "jotai";

const useChangeLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(atoms.selectedLanguage);
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (locale: "ru" | "tk" | "en") => {
    if (locale !== selectedLanguage) {
      setSelectedLanguage(locale);
      router.replace(pathname, { locale });
    }
  };

  const languageTitle = (() => {
    switch (selectedLanguage) {
      case "tk": {
        return "Turkmen";
      }
      default:
        return "Русский";
    }
  })();

  return { handleChange, languageTitle };
};

export default useChangeLanguage;
