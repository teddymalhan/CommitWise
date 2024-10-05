import React from "react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

interface ProgressBarProps {
  totalPages: number;
  currentPage: number;
  onNavigate: (page: number) => void;
  homeLink?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalPages,
  currentPage,
  onNavigate,
  homeLink,
}) => {
  const progressValue = (currentPage / totalPages) * 100;
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-600 border-t-4 border-black">
      <Button
        className="bg-red-500 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        onClick={() => router.push('/dashboard')}
      >
        <Home className="h-4 w-4" />
      </Button>
      <Progress value={progressValue} className="w-2/3 mx-7" />
      <div className="flex gap-2">
        <Button
          className="bg-teal-500 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          onClick={() => onNavigate(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          className="bg-cyan-500 text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          onClick={() => onNavigate(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProgressBar;
