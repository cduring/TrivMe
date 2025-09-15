import { useState } from "react";

function Join() {
  const [sessionCode, setSessionCode] = useState("");

  return (
    <div className="w-full md:w-1/3 h-1/3 flex flex-col items-center justify-center gap-4 border-2 bg-purple-800 rounded-xl py-2 px-4">
      <h1 className="uppercase font-bold text-center text-2xl">
        Session Code:
      </h1>
      <input
        value={sessionCode}
        onChange={(e) => setSessionCode(e.target.value)}
        placeholder="123456"
        className="w-full px-2 py-1 rounded-xl bg-purple-600 text-purple-50 text-center placeholder:text-gray-300 placeholder:italic"
      />
      <button className="bg-green-900 rounded-xl px-4 py-2">Join Now</button>
    </div>
  );
}

export default Join;
