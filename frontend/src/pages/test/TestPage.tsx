import LoadingScreen from "@/components/navigation/LoadingScreen";

const TestPage = () => {
  return (
    <>
      <div className="flex h-screen justify-center items-center bg-secondary border-red-500">
        <LoadingScreen />
      </div>
    </>
  );
};

export default TestPage;
