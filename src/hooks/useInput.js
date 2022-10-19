import React, { useCallback, useState } from "react";

const useInput = (initialState) => {
  const [inputs, setInputs] = useState(initialState);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const reset = useCallback(() => setInputs(initialState), [initialState]);

  return { inputs, onChange, reset };
};

export default useInput;
