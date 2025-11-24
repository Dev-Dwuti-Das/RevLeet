import Stats from "./stats";

function home() {
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-1/3 bg-sky-600 flex justify-center border-3 rounded-md">01</div>
        <div className="basis-1/3 bg-sky-700 flex justify-center"><Stats></Stats></div>
        <div className="basis-1/3 bg-sky-800 flex justify-center">03</div>
      </div>
      
      <h1 class="text-3xl font-bold ">Hello world!</h1>
    </>
  );
}

export default home;
