export const markdownComponents = {
  p: ({ node, ...props }) => (
    <p className="mb-4 leading-relaxed text-white/85 text-[16px]" {...props} />
  ),

  h1: ({ node, ...props }) => (
    <h1 className="text-3xl font-extrabold mt-8 mb-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] tracking-wide" {...props} />
  ),

  h2: ({ node, ...props }) => (
    <h2 className="text-2xl font-bold mt-6 mb-3 text-blue-300 drop-shadow-[0_0_4px_rgba(59,130,246,0.4)] tracking-wide" {...props} />
  ),

  h3: ({ node, ...props }) => (
    <h3 className="text-xl font-semibold mt-5 mb-2 text-blue-200 tracking-wide" {...props} />
  ),

  h4: ({ node, ...props }) => (
    <h4 className="text-lg font-semibold mt-4 mb-2 text-white" {...props} />
  ),

  ul: ({ node, ...props }) => (
    <ul
      className="list-disc list-inside mb-4 space-y-1 text-white/90 [&>li]:flex [&>li]:items-center [&>li]:gap-2"
      {...props}
    />
  ),

  ol: ({ node, ...props }) => (
    <ol
      className="list-decimal list-inside mb-4 space-y-1 text-white/90 [&>li]:flex [&>li]:items-center [&>li]:gap-2"
      {...props}
    />
  ),

  li: ({ node, ...props }) => (
    <li className="whitespace-normal break-words" {...props} />
  ),

  blockquote: ({ node, ...props }) => (
    <blockquote
      className="border-l-4 border-cyan-400/60 pl-5 py-3 my-4 bg-white/5 backdrop-blur-md text-white/80 italic rounded-md shadow-lg"
      {...props}
    />
  ),

  code: ({ node, inline, className, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline ? (
      <div className="bg-[#0b0f19] border border-white/10 rounded-xl p-4 my-4 overflow-x-auto shadow-[0_0_14px_rgba(0,200,255,0.3)]">
        <pre className="text-sm leading-6">
          <code className={className} {...props} />
        </pre>
      </div>
    ) : (
      <code className="bg-white/10 text-cyan-300 px-2 py-1 rounded-md text-sm font-mono" {...props} />
    );
  },

  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-6 shadow-xl rounded-xl">
      <table
        className="w-full border-collapse bg-white/5 backdrop-blur-md border border-white/20 rounded-xl"
        {...props}
      />
    </div>
  ),

  thead: ({ node, ...props }) => (
    <thead className="bg-cyan-700/30 border-b border-white/20 text-white uppercase tracking-wider" {...props} />
  ),

  tbody: ({ node, ...props }) => (
    <tbody className="divide-y divide-white/10" {...props} />
  ),

  tr: ({ node, ...props }) => (
    <tr className="border-b border-white/10 hover:bg-white/10 transition-all duration-200" {...props} />
  ),

  th: ({ node, ...props }) => (
    <th className="px-5 py-3 text-left font-semibold" {...props} />
  ),

  td: ({ node, ...props }) => (
    <td className="px-5 py-3 text-white/80" {...props} />
  ),

  strong: ({ node, ...props }) => (
    <strong className="font-bold text-white" {...props} />
  ),

  em: ({ node, ...props }) => (
    <em className="italic text-white/90" {...props} />
  ),

  a: ({ node, ...props }) => (
    <a className="text-cyan-300 hover:text-cyan-200 underline transition-all duration-200" {...props} />
  ),
};
