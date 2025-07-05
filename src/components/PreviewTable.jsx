import dsaData from "../data/problems";

const difficultyStyles = {
  Easy: "bg-green-600/80 text-green-100",
  Medium: "bg-yellow-500/80 text-yellow-900",
  Hard: "bg-red-600/80 text-red-100",
};

const PreviewTable = () => (
  <div className="mt-12 px-6">
    <h3 className="text-2xl font-semibold text-white mb-6 text-center">
      📋 Preview of Problem Dataset
    </h3>

    <div className="overflow-x-auto rounded-2xl ring-1 ring-white/10 backdrop-blur-md bg-white/5 shadow-xl">
      <table className="min-w-full text-sm text-white/90">
        <thead className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Pattern</th>
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 font-semibold">Platform</th>
            <th className="px-4 py-3 font-semibold">Difficulty</th>
            <th className="px-4 py-3 font-semibold">Link</th>
          </tr>
        </thead>
        <tbody>
          {dsaData.slice(0, 3).map((item, idx) => (
            <tr
              key={idx}
              className="hover:bg-white/10 transition-colors duration-200 even:bg-white/5"
            >
              <td className="px-4 py-3">
                <span className="inline-block bg-blue-800/50 text-blue-100 px-3 py-1 rounded-full text-xs font-medium">
                  {item.pattern}
                </span>
              </td>
              <td className="px-4 py-3">{item.title}</td>
              <td className="px-4 py-3">{item.platform}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${difficultyStyles[item.difficulty]}`}
                >
                  {item.difficulty}
                </span>
              </td>
              <td className="px-4 py-3">
                <a
                  href={item.link}
                  target="_blank"
                  className="text-indigo-400 underline hover:text-indigo-200"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} className="px-4 py-4 text-center text-gray-400 italic">
              ... and 377+ more problems
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default PreviewTable;
