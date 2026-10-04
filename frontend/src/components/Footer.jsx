import { Building2, Mail, MapPin, Phone, ShieldCheck, Landmark, Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><div className="footer-emblem"><Landmark size={34}/></div><div><strong>Ministry of Agriculture and Farmers Welfare</strong><span>Government of India</span></div><div className="footer-fasal"><Leaf size={22}/> FasalSathi | फसल साथी</div><p>An AgriTech platform prototype inspired by public-service agricultural platforms. Not an official government service.</p><div className="footer-note"><ShieldCheck size={16}/> Government-style demo branding</div></div>
        <div><h3>Quick Links</h3><a href="/">Home</a><a href="/prediction">Prediction</a><a href="/help">Help</a><a href="/profile">Profile</a></div>
        <div><h3>Resources</h3><a>Farmer's Guide</a><a>Crop Calendar</a><a>Weather Forecast</a><a>Market Prices</a><a>FAQ</a></div>
        <div><h3>Contact</h3><span><Mail size={17}/> support@fasalsathi.gov.in</span><span><Phone size={17}/> 1800-XXX-XXXX</span><span><MapPin size={17}/> Krishi Bhavan, New Delhi</span><span><Building2 size={17}/> National Informatics Centre</span></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Government of India · FasalSathi Prototype</span><span>Privacy Policy · Terms of Use · Accessibility · Sitemap</span></div>
    </footer>
  );
}
