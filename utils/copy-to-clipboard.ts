import toast from "react-hot-toast";

export const copyToClipBoard = async (text: string) => {
  try {
    const clpItem = new ClipboardItem({
      "text/plain": new Blob([text], { type: "text/plain" }),
    });
    await window.navigator.clipboard.write([clpItem]);
  } catch (error) {
    await window.navigator.clipboard.writeText(text);
  }

  toast.success("URL copied to clipboard");
};
