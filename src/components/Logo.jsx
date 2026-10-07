import { Link } from "react-router-dom";

export default function Logo({ size = "text-[34px]" }) {
  return (
    <Link
      to="/login"
      className={`inline-flex items-center font-bold text-li-blue leading-none select-none ${size}`}
    >
      <span>Linked</span>
      <span className="bg-li-blue text-white rounded-[4px] px-[0.18em] pb-[0.05em] ml-[0.05em]">
        in
      </span>
    </Link>
  );
}
