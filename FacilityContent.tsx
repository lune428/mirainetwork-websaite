import { useState, useEffect } from "react";

interface FacilityContentProps {
  facility: "mirai" | "hikari" | "studio_m";
  section: string;
  fallback?: string;
}

export default function FacilityContent({ facility, section, fallback = "" }: FacilityContentProps) {
  const [content, setContent] = useState<string>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [facility, section]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/page-content/${facility}/${section}`);
      
      if (response.ok) {
        const data = await response.json();
        setContent(data.content);
      } else {
        // Use fallback if content not found
        setContent(fallback);
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
      setContent(fallback);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">読み込み中...</div>;
  }

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    
    lines.forEach((line, index) => {
      // Heading
      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={index} className="text-2xl font-bold mt-6 mb-3">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // List item
      else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={index} className="ml-6">
            {line.replace(/^[*-] /, '')}
          </li>
        );
      }
      // Bold text
      else if (line.includes('**')) {
        const parts = line.split('**');
        elements.push(
          <p key={index} className="mb-2">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        );
      }
      // Regular paragraph
      else if (line.trim()) {
        elements.push(
          <p key={index} className="mb-2">
            {line}
          </p>
        );
      }
      // Empty line
      else {
        elements.push(<br key={index} />);
      }
    });
    
    return elements;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  );
}

