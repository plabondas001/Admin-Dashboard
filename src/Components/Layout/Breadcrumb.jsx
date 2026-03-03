import React from "react";

const Breadcrumb = ({ title = "", paths = [] }) => {
    return (
        <div className="mb-6">
            <div className="rounded-xl bg-[#111117] p-5 shadow-md flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
                </div>

                <div className="text-sm text-slate-300">
                    {paths && paths.length > 0 && (
                        <nav className="space-x-2">
                            {paths.map((p, idx) => (
                                <span key={p} className={"text-sm " + (idx === paths.length - 1 ? "text-slate-200 font-semibold" : "text-sky-500")}>{p}{idx < paths.length - 1 && <span className="mx-2 text-slate-500">~</span>}</span>
                            ))}
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
