const links = [
  "About",
  "Accessibility",
  "User Agreement",
  "Privacy Policy",
  "Cookie Policy",
  "Copyright Policy",
  "Send Feedback",
  "Language",
];

export default function Footer() {
  return (
    <footer className="mt-10 pb-8 px-4 text-xs text-[#666] flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-3xl mx-auto">
      <span className="flex items-center gap-1">
        <b className="text-li-blue">
          Linked
          <span className="bg-li-blue text-white rounded-sm px-[2px] ml-[1px]">in</span>
        </b>
        © 2026
      </span>
      {links.map((l) => (
        <a key={l} href="#" onClick={(e) => e.preventDefault()} className="hover:text-li-blue hover:underline">
          {l}
        </a>
      ))}
    </footer>
  );
}
