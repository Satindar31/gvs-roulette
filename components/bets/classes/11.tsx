import React, { useState } from "react";


export default function SubjectForm({ subjects }: { subjects: string[] }) {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <form className="max-w-md mx-auto mt-8 p-8 rounded-xl shadow-lg bg-white font-sans">
            <label
                htmlFor="subject"
                className="block text-xl font-semibold mb-6 text-gray-800"
            >
                Choose a subject:
            </label>
            <div className="flex gap-4">
                {subjects.map((subject) => (
                    <button
                        key={subject}
                        type="button"
                        onClick={() => setSelected(subject)}
                        className={`px-4 py-3 rounded-lg font-medium transition 
                            border 
                            ${selected === subject
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 bg-gray-50"} 
                            text-gray-900 hover:border-blue-400 hover:bg-blue-100`}
                    >
                        {subject}
                    </button>
                ))}
            </div>
            {selected && (
                <div className="mt-8 text-blue-600 font-medium text-center text-base">
                    You selected: {selected}
                </div>
            )}
        </form>
    );
}
