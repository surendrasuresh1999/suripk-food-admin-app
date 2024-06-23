import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((data, i) => (
          <li key={i} className="rounded-md bg-white p-2 border">
            hello
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
