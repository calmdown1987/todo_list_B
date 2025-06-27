import { useState, useCallback} from "react";

function useToggle() {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggle = useCallback((id:number) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev,id]
    );
  },[]);

  return { openIds, toggle}
}

export default useToggle;
