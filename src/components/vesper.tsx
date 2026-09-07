export function Vesper() {
  const details = [
    { label: "Model", value: "ASUS TUF A15" },
    { label: "Role", value: "Build machine" },
    { label: "Purpose", value: "Code, learn, ship" },
    { label: "Signature", value: "Late-night focus" },
  ];

  const traits = ["builds", "debugging", "ideas", "experiments", "focus", "iteration"];

  return (
    <section id="vesper" className="section-wrap">
      <div className="section-head">
        <span className="section-index">02</span>
        <div>
          <h2>Vesper.</h2>
          <p>Signature machine / creative companion</p>
          <div className="hairline mt-6" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,124,255,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(111,214,208,0.15),transparent_25%)]" />
          <div className="relative">
            <p className="technical-label">The machine behind the work</p>
            <h3 className="mt-4 max-w-xl text-3xl font-medium leading-[0.96] tracking-[-0.06em] text-foreground sm:text-5xl">
              My ASUS TUF A15 is not just hardware — it is part of the story.
            </h3>
            <p className="mt-5 max-w-2xl leading-8 text-muted">
              Vesper is the laptop I named when the work started feeling less like homework and more like a craft.
              It has carried code, research, failed builds, and the quiet confidence that comes from learning by doing.
            </p>
            <p className="mt-4 max-w-2xl leading-8 text-muted">
              This portfolio carries that same energy: practical, iterative, and built with real momentum.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {traits.map((item) => (
                <span
                  key={item}
                  className="border border-border bg-white/[0.02] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-[2rem] p-6 sm:p-8">
          <div className="rounded-[1.5rem] border border-border bg-[linear-gradient(145deg,rgba(139,124,255,0.12),rgba(11,12,16,0.6))] p-4">
            <div className="relative overflow-hidden rounded-[1.25rem] border border-border bg-[#10141a] p-4 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>

              <div className="rounded-xl border border-border bg-[#0d1118] p-4">
                <p className="technical-label">VESPER // SYSTEM</p>
                <div className="mt-4 space-y-3">
                  {details.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-4 border-b border-border pb-2 last:border-b-0 last:pb-0">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-muted">{item.label}</span>
                      <span className="text-sm text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
