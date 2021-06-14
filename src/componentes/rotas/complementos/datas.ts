import { format, differenceInMinutes } from "date-fns";

const FormatoDataPadrao = "M/dd/yyyy";
const dataModificado = (compTime?: Date | null): string => {
  if (!compTime) return "";

  const now = new Date();
  const diffInMinutes = differenceInMinutes(now, compTime);
  //console.log("diff", diffInMinutes);
  if (diffInMinutes > 60) {
    if (diffInMinutes > 24 * 60) {
      return format(compTime, FormatoDataPadrao);
    }
    return Math.round(diffInMinutes / 60) + "h ago";
  }
  return Math.round(diffInMinutes) + "m ago";
};

export { dataModificado };