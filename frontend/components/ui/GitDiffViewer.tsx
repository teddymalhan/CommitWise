'use client';
import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronLeft, ChevronRight, Home, ChevronDown, ChevronUp } from 'lucide-react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-diff'

export default function Component() {
  const [text, setText] = useState("Welcome aboard! We're going to implement Git in Python to learn more about how Git works on the inside.\nThis tutorial is different from most Git internals tutorials because we're not going to talk about Git only with words but also with code! We're going to write in Python as we go.\nThis is not a tutorial on using Git! To follow along I advise that you have working knowledge of Git. If you're a newcomer to Git, this tutorial is probably not the best place to start your Git journey. I suggest coming back here after you've used Git a bit and you're comfortable with making commits, branching, merging, pushing and pulling.")
  
  const [diffs, setDiffs] = useState([
    {
      file: '.gitignore',
      content: `@@ -0,0 +1,2 @@
+__pycache__
+*.egg-info/`
    },
    {
      file: 'setup.py',
      content: `@@ -0,0 +1,12 @@
+#!/usr/bin/env python3
+
+from setuptools import setup
+
+setup(name = 'ugit',
+      version = '1.0',
+      packages = ['ugit'],
+      entry_points = {
+          'console_scripts': [
+              'ugit = ugit.cli:main'
+          ]
+      })`
    },
    {
      file: 'ugit/cli.py',
      content: `@@ -0,0 +1,2 @@
+def main():
+    print('Hello, World!')`
    }
  ])

  const [openStates, setOpenStates] = useState(diffs.map(() => true))
  const [leftWidth, setLeftWidth] = useState(50) // percentage
  const separatorRef = useRef(null)

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
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 flex overflow-hidden relative">
        <ScrollArea className="bg-gray-200 p-4" style={{ width: `${leftWidth}%` }}>
          <div className="mb-4">
            <div className="flex items-center justify-between w-full p-4 bg-gray-300 rounded-t-md antialiased">
              <span className="font-medium">Tutorial</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="w-full h-[calc(100vh-10rem)] p-4 bg-gray-800 rounded-b-md overflow-auto">
              <p className="text-white text-2xl leading-relaxed whitespace-pre-wrap font-sans antialiased">
                {text}
              </p>
            </div>
          </div>
        </ScrollArea>
        <div
          ref={separatorRef}
          className="w-1 bg-gray-400 cursor-col-resize hover:bg-blue-500 transition-colors"
          onMouseDown={handleMouseDown}
        />
        <ScrollArea className="bg-gray-200 p-4" style={{ width: `${100 - leftWidth}%` }}>
          {diffs.map((diff, index) => (
            <Collapsible key={index} className="mb-4" open={openStates[index]} onOpenChange={() => toggleCollapsible(index)}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-300 rounded-t-md">
                <span className="font-medium">{diff.file}</span>
                {openStates[index] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <pre className="p-4 rounded-b-md bg-gray-800 overflow-x-auto">
                  <code className="language-diff text-sm">{diff.content}</code>
                </pre>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </ScrollArea>
      </div>
      <div className="flex justify-between items-center p-4 bg-gray-300">
        <Button className="bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
          <Home className="h-4 w-4" />
        </Button>
        <Progress value={33} className="w-1/3 mx-4" />
        <div className="flex gap-2">
          <Button className="bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button className="bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
