import { useState } from "react";

export default function Field({ label, type = "text", value, onChange, error }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <div className="relative">
        <input
          aria-label={label}
          placeholder={label}
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-12 px-3 rounded border bg-white text-base ${
            error ? "border-[#cc1016]" : "border-[#666]"
          } ${isPassword ? "pr-16" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-li-blue font-semibold text-sm"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && <p className="text-[#cc1016] text-sm mt-1">{error}</p>}
    </div>
  );
}
