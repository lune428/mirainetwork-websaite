Text file: Benefits.tsx
Latest content with line numbers:
2	import { useLocation } from "wouter";
3	import { Button } from "@/components/ui/button";
4	import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
5	import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
6	import { useToast } from "@/hooks/use-toast";
7	
8	interface Benefit {
9	  id: number;
10	  title: string;
11	  description: string | null;
12	  category: string;
13	  displayOrder: number;
14	  isPublished: boolean;
15	  createdAt: string;
16	  updatedAt: string;
17	}
18	
19	export default function BenefitsAdmin() {
20	  const [benefits, setBenefits] = useState<Benefit[]>([]);
21	  const [loading, setLoading] = useState(true);
22	  const [, setLocation] = useLocation();
23	  const { toast } = useToast();
24	
25	  useEffect(() => {
26	    fetchBenefits();
27	  }, []);
28	
29	  const fetchBenefits = async () => {
30	    try {