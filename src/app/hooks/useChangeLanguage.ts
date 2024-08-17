import { usePathname, useRouter } from "@/app/(pages)/_providers/i18n/navigation";
import { getCookie } from "cookies-next";

const useChangeLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  // const lang = getCookie("NEXT_LOCALE");

  const handleChange = (locale: "ru" | "tk") => {
    // if (locale !== lang) {
    //   router.replace(pathname, { locale });
    // }
  };

  return { handleChange };
};

export default useChangeLanguage;
