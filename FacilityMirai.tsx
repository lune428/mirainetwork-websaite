Text file: FacilityMirai.tsx
Latest content with line numbers:
2	import { MapPin, Phone, Mail, Clock, Users, Calendar } from "lucide-react";
3	import { FACILITIES } from "@shared/const";
4	
5	export default function FacilityMirai() {
6	  const images = [
7	    { src: "/images/IMG_9850.jpeg", alt: "MIRAI 外観" },
8	    { src: "/images/IMG_9851.jpeg", alt: "MIRAI 作業風景" },
9	    { src: "/images/IMG_9852.jpeg", alt: "MIRAI 施設内部" },
10	  ];
11	
12	  return (
13	    <div className="min-h-screen gradient-bg">
14	      {/* Hero Section */}
15	      <div className="facility-mirai py-16">
16	        <div className="container">
17	          <div className="max-w-4xl mx-auto text-center">
18	            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
19	              {FACILITIES.mirai.name}
20	            </h1>