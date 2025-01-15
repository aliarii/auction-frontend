const Loading = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-dark-2 border-t-info dark:border-light-2 dark:border-t-info"></div>
      <p>{"Loading..."}</p>
    </div>
  );
};
export default Loading;
