import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Slider } from "~~/components/Slider";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="">
        <h1 className="text-4xl text-center font-bold my-10">Predictor Game</h1>
        <Slider />
      </div>
    </>
  );
};

export default Home;
