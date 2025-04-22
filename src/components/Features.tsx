import { Truck, ShieldCheck, Award, Zap, Clock } from "lucide-react";

const features = [
  {
    icon: <Truck className="text-gray-700" />,
    title: "Free Delivery",
    description:
      "Enjoy fast, free delivery on all orders—no minimum purchase required.",
  },
  {
    icon: <ShieldCheck className="text-gray-700" />,
    title: "100% Secure Payment",
    description:
      "Shop with confidence using our encrypted and fully secure checkout process.",
  },
  {
    icon: <Award className="text-gray-700" />,
    title: "Quality Guarantee",
    description:
      "We stand by our products—quality you can trust, guaranteed every time.",
  },
  {
    icon: <Zap className="text-gray-700" />,
    title: "Guaranteed Savings",
    description:
      "Save more with exclusive deals, discounts, and price match promises.",
  },
  {
    icon: <Clock className="text-gray-700" />,
    title: "Daily Offers",
    description:
      "Check back every day for new deals, flash sales, and limited-time discounts.",
  },
];

const Features = () => {
  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="mb-3">{feature.icon}</div>
          <h3 className="font-semibold mb-2">{feature.title}</h3>
          <p className="text-xs text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
