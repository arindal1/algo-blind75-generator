const stats = [
  { number: "22", label: "DSA Patterns" },
  { number: "380+", label: "Problems" },
  { number: "3", label: "Difficulty Levels" },
];

const StatsGrid = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base text-gray-400">{stat.label}</dt>
              <dd className="order-first text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                {stat.number}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default StatsGrid;
