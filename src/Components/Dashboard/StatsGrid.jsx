import { ArrowRight } from "lucide-react";

const StatsGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white backdrop-blur-xl rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-300 transition-all duration-300 group">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium">Stats Title</p>
                        <p>Stats Title</p>
                        <p className="text-3xl font-bold ">Stats Value</p>
                    </div>

                    <div className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4"></ArrowRight>
                    <span>Stats Change</span>
                    <span className="text-sm ">Vs Last</span>
                    </div>

                </div>
                <div className="{`p-3 rounded-xl group-hover:scale-110 transition-all duration-200`}">

                </div>
            </div>
            {/* Progressbar */}
            <div className="mt-4 bg-white rounded-full overflow-hidden">
                <div className={`w-full bg-gradient-to-r rounded-full transition-all duration-100`}>

                </div>

            </div>
        </div>
    );
};

export default StatsGrid;