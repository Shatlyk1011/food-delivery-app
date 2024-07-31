import { usePathname, useRouter } from "@/app/(pages)/_providers/i18n/navigation";
import atoms from "@/app/(pages)/_providers/jotai";
import { useAtom } from "jotai";

const useChangeLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(atoms.selectedLanguage);

  const router = useRouter();
  const pathname = usePathname();

  const languageTitle = (() => {
    switch (selectedLanguage) {
      case "tk": {
        return "Turkmen";
      }
      default:
        return "Русский";
    }
  })();

  const handleChange = (locale: "ru" | "tk") => {
    if (locale !== selectedLanguage) {
      setSelectedLanguage(locale);
      router.replace(pathname, { locale });
    }
  };

  return { languageTitle, handleChange };
};

export default useChangeLanguage;
