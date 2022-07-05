import { useCallback, useState } from "react";
import { useMountedRef } from "./index";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "success" | "error";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
const defaultConfig = {
  throwOnError: false,
};
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...initialState,
    ...defaultInitialState,
  });
  const config = { ...defaultConfig, ...initialConfig };
  const mountedRef = useMountedRef();
  //useState直接传入函数的含义是：惰性初始化，所以，要用useState保存函数，不能直接传入函数
  // const [retry, setRetry] = useState(() => {});
  const [retry, setRetry] = useState(() => () => {});
  const setData = useCallback(
    (data: D) => setState({ error: null, data, stat: "success" }),
    []
  );

  const setError = useCallback(
    (error: Error) => setState({ error, data: null, stat: "error" }),
    []
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry()) {
          run(runConfig?.retry(), runConfig);
        }
      });
      setState((prevState) => ({ ...prevState, stat: "loading" }));
      return promise
        .then((res) => {
          if (mountedRef) setData(res);
          return res;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    setData,
    setError,
    //retry 被调用时重新跑一遍run，让state刷新一遍
    retry,

    ...state,
  };
};
