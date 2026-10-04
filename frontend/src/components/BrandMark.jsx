import { Leaf, Landmark } from "lucide-react";

export default function BrandMark({ compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "min-w-0"}`}>
      <div className="emblem-box" aria-label="National Emblem of India placeholder">
        <Landmark size={34} strokeWidth={1.7} />
      </div>
      <div className="brand-copy">
        <div className="ministry-name">Ministry of Agriculture and Farmers Welfare</div>
        <div className="gov-name">Government of India</div>
      </div>
      <div className="brand-divider" />
      <div className="fasal-logo">
        <span className="logo-mark"><Leaf size={24} strokeWidth={2.2} /></span>
        <span>FasalSathi</span>
        <span className="hindi">| फसल साथी</span>
      </div>
    </div>
  );
}
