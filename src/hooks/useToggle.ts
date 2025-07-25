import { useState } from "react";

// アコーディオンの開閉状態をIDで管理、開閉状態を切り替える
function useToggle() {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggle = (id: number) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev,id]
    );
  };

  return { openIds, toggle};
}

export default useToggle;
