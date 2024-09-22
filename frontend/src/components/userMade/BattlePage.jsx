const BattlePage = () => {
  return (
    <div className="max-w-screen py-[5vw] ">

        <div className="text-center">
                <h2 className="text-[4vw] font-bold text-[#3565EC]">Battle <span className='text-yellow-500'>Arena</span></h2>
        </div>

        <div className="flex justify-center gap-[8vw]">
            <div className="flex flex-col items-center font-bold text-[2vw]">
            <img className="hover:drop-shadow-2xl active:scale-[0.7] transition-all ease-in duration-200 scale-75" src="./images/createBattle.png" alt="" />
            <h2 className="text-[#F47F2F]">Create Battle</h2>
            </div>
            
            <div className="flex flex-col items-center font-bold text-[2vw]">
            <img className="hover:drop-shadow-2xl active:scale-[0.7] transition-all ease-in duration-200 scale-75" src="./images/joinBattle.png" alt="" />
            <h2 className="text-[#F47F2F]">Join Battle</h2>
            </div>
        </div>
    </div>
  )
}

export default BattlePage