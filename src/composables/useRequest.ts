import { ref } from 'vue';

export const useRequest = <T>(request: () => Promise<T>) => {
  const isLoading = ref(false);
  const isError = ref(false);
  const message = ref<string | null>(null);
  const data = ref<T | null>(null);

  const sendRequest = async () => {
    try {
      isLoading.value = true;
      data.value = await request();
    } catch (error) {
      isError.value = true;
      message.value =
        error instanceof Error ? error.message : 'Something went wrong';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    isError,
    message,
    data,
    sendRequest,
  };
};
