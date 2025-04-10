
import { Truck, ShieldCheck, Award, Zap, Clock } from "lucide-react";

const features = [
  {
    icon: <Truck className="text-gray-700" />,
    title: "Free delivery",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa duis.",
  },
  {
    icon: <ShieldCheck className="text-gray-700" />,
    title: "100% secure payment",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa duis.",
  },
  {
    icon: <Award className="text-gray-700" />,
    title: "Quality guarantee",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa duis.",
  },
  {
    icon: <Zap className="text-gray-700" />,
    title: "Guaranteed savings",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa duis.",
  },
  {
    icon: <Clock className="text-gray-700" />,
    title: "Daily offers",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa duis.",
  },
];

const Features = () => {
  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-3">
            {feature.icon}
          </div>
          <h3 className="font-semibold mb-2">{feature.title}</h3>
          <p className="text-xs text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
