import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, index: number) => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContext = createContext({} as BottomSheetContextType);

export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const openBottomSheet = useCallback(
    (NewContent: React.ReactNode, index: number) => {
      setContent(NewContent);
    },
    []
  );

  const closeBottomSheet = useCallback(() => {
    setContent(null);
  }, []);
  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
    </BottomSheetContext.Provider>
  );
};
