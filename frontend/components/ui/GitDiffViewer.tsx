'use client';
import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronLeft, ChevronRight, Home, ChevronDown, ChevronUp, FileDiff, School} from 'lucide-react'
import ProgressBar from '@/components/ui/progressbar'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-diff'

interface Diff {
  file: string;
  content: string;
}

interface ComponentProps {
  initialText: string;
  initialDiffs: Diff[];
  currentPage: number;
  totalPages: number;
  onNavigate: (page: number) => void;
}

const Component: React.FC<ComponentProps> = ({ initialText, initialDiffs, currentPage, totalPages, onNavigate}) => {
  const [text, setText] = useState(initialText)
  
  const [diffs, setDiffs] = useState(initialDiffs)

  const [openStates, setOpenStates] = useState(initialDiffs.map(() => true))
  const [leftWidth, setLeftWidth] = useState(50) // percentage
  const separatorRef = useRef<HTMLDivElement>(null)

  // Update state when initialText changes
  useEffect(() => {
    setText(initialText)
  }, [initialText]);


  // Update state when initialDiffs changes
  useEffect(() => {
    setDiffs(initialDiffs)
    setOpenStates(initialDiffs.map(() => true))
  }, [initialDiffs])

  useEffect(() => {
    Prism.highlightAll()
  }, [diffs, openStates])

  const toggleCollapsible = (index: number) => {
    const newOpenStates = [...openStates]
    newOpenStates[index] = !newOpenStates[index]
    setOpenStates(newOpenStates)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const newLeftWidth = (e.clientX / window.innerWidth) * 100
    setLeftWidth(Math.max(20, Math.min(80, newLeftWidth)))
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-200 no-scrollbar overscroll-none">
      <div className="flex-1 flex overflow-hidden relative bg-gray-200 no-scrollbar overscroll-none">
        <ScrollArea className="bg-gray-500 p-4 no-scrollbar overscroll-none" style={{ width: `${leftWidth}%` }}>
          <div className="mb-4">
            <div className="flex items-center justify-between w-full p-4 bg-red-500 rounded-t-md antialiased border-black border-t-4 border-x-4">
              <School className="h-4 w-4 text-white" />
              <span className="font-medium text-white justify-center text-center">Tutorial</span>
              <ChevronDown className="h-4 w-4 text-white" />
            </div>
            <div className="w-full h-[calc(100vh-10rem)] p-4 bg-gray-800 rounded-b-md overflow-auto border-4 border-black">
              <p className="text-white text-2xl leading-relaxed whitespace-pre-wrap font-sans antialiased">
                {text}
              </p>
            </div>
          </div>
        </ScrollArea>
        <div
          ref={separatorRef}
          className="w-1 bg-gray-400 cursor-col-resize hover:bg-blue-500 transition-colors border-black border-4"
          onMouseDown={handleMouseDown}
        />
        <ScrollArea className="bg-gray-400 p-4" style={{ width: `${100 - leftWidth}%` }}>
          {diffs.map((diff, index) => (
            <Collapsible key={index} className="mb-4" open={openStates[index]} onOpenChange={() => toggleCollapsible(index)}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-300 rounded-sm border-4 border-black">
                <FileDiff className="h-4 w-4" />
                <span className="font-medium">{diff.file}</span>
                {openStates[index] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <pre className="p-4 rounded-b-md bg-gray-800 overflow-x-auto border-white border-4">
                  <code className="language-diff text-sm">{diff.content}</code>
                </pre>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </ScrollArea>
      </div>
      <ProgressBar totalPages={totalPages} currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  )
}

export default Component;
