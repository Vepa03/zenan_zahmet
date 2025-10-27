import { Clock, Mail, Phone } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Call Us",
    subtitle: "+993 65 345687",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "zenanzahmeti@gmail.com",
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3  border-b border-gray-200 ">
      {data.map((item, index) => (
        <div
          key={index}
          className="group flex items-center gap-4 p-4  transition-colors"
        >
          <div className="flex-shrink-0">{item.icon}</div>
          <div>
            <h3 className="text-gray-900 font-semibold group-hover:text-black transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
