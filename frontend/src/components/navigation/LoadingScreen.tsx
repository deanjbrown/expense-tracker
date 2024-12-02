const LoadingScreen: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex space-x-4 border-green-600 ">
          <div className="h-8 w-8 bg-primary rounded-full animate-loadAnimDots delay-400"></div>
          <div className="h-8 w-8 bg-primary rounded-full animate-loadAnimDots delay-200"></div>
          <div className="h-8 w-8 bg-primary rounded-full animate-loadAnimDots delay-0"></div>
        </div>
        <div className="flex space-x-4 border-yellow-600 ">
          <div className="w-8 h-0.5 bg-slate-500 rounded-xl shadow-2xl animate-loadAnimShadows delay-400"></div>
          <div className="w-8 h-0.5 bg-slate-500 rounded-xl shadow-2xl animate-loadAnimShadows delay-200"></div>
          <div className="w-8 h-0.5 bg-slate-500 rounded-xl shadow-2xl animate-loadAnimShadows delay-0"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
