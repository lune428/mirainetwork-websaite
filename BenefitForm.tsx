Text file: BenefitForm.tsx
Latest content with line numbers:
2	import { useLocation, useParams } from "wouter";
3	import { Button } from "@/components/ui/button";
4	import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
5	import { Input } from "@/components/ui/input";
6	import { Label } from "@/components/ui/label";
7	import { Textarea } from "@/components/ui/textarea";
8	import {
9	  Select,
10	  SelectContent,
11	  SelectItem,
12	  SelectTrigger,
13	  SelectValue,
14	} from "@/components/ui/select";
15	import { useToast } from "@/hooks/use-toast";
16	import { ArrowLeft } from "lucide-react";
17	
18	interface BenefitFormData {
19	  title: string;
20	  description: string;
21	  category: string;
22	  isPublished: boolean;
23	}
24	
25	export default function BenefitForm() {
26	  const params = useParams();
27	  const id = params.id;
28	  const [, setLocation] = useLocation();
29	  const { toast } = useToast();
30	  const isEdit = Boolean(id);