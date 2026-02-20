const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Customer Support" },
];

export function StatsSection() {
  return (
    <section className="border-y border-border bg-primary/5 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-base font-medium text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
