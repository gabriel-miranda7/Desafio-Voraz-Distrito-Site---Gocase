import { AxiosError } from "axios";

const handleNetworkError = () => {
  return Promise.reject(new Error("Erro de conexão"));
};

const handleBadRequest = (error: AxiosError) => {
  const data = error.response?.data as { error: string };
  if (data.error) return Promise.reject(new Error(data.error));
  return data;
};

const handleUnauthorized = (error: AxiosError) => {
  const data = error.response?.data as { error: string };
  if (data.error) return Promise.reject(new Error(data.error));
  return Promise.reject(new Error("User not authorized"));
};

const handleNotFound = (error: AxiosError) => {
  const data = error.response?.data as { error: string };
  if (data.error) return Promise.reject(new Error(data.error));
  return data;
};

const handleInternalServerError = (error: AxiosError) => {
  const data = error.response?.data as { error: string };
  return Promise.reject(
    new Error(data.error || "Internal Error. Try again later")
  );
};

export const errorInterceptor = (error: AxiosError) => {
    if (error.message == "Network error") {
        return handleNetworkError();
    }

    if (error.message == "Request failed with status code 400") {
        return handleBadRequest(error)
    }

    if (error.message == "Request failed with status code 401") {
        return handleUnauthorized(error)
    }

    if (error.message == "Request failed with status code 404") {
        return handleNotFound(error)
    }

    if (error.message == "Request failed with status code 500") {
        return handleInternalServerError(error)
    }

    return Promise.reject(error);
}
