import { ToasterProps, toast } from "sonner";
import { useTranslations } from "next-intl";

const useToast = () => {
  const t = useTranslations();

  const handleToast = (msg: string, type: ToastTypes = "success", props?: ToasterProps) => {
    toast[type](t(msg), { ...props });
  };
  return handleToast;
};

export default useToast;
