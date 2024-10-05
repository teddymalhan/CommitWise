"use client";
import React, { useState } from "react";
import GitDiffViewer from "@/components/ui/GitDiffViewer";

const pages = [
  {
    initialText: `Welcome aboard! We're going to implement Git in Python to learn more about how Git works on the inside.
This tutorial is different from most Git internals tutorials because we're not going to talk about Git only with words but also with code! We're going to write in Python as we go.`,
    initialDiffs: [
      {
        file: ".gitignore",
        content: `@@ -0,0 +1,2 @@
+__pycache__
+*.egg-info/`,
      },
      {
        file: "setup.py",
        content: `@@ -0,0 +1,12 @@
+#!/usr/bin/env python3
+
+from setuptools import setup
+
+setup(name = 'ugit',
+      version = '1.0',
-      packages = ['ugit'],
-      entry_points = {
+          'console_scripts': [
+              'ugit = ugit.cli:main'
+          ]
+      })`,
      },
    ],
  },
  {
    initialText: `Random text for the second page`,
    initialDiffs: [
      {
        file: "ugit/cli.py",
        content: `@@ -0,0 +1,2 @@
+def main():
+    print('Welcome to the second page!')`,
      },
    ],
  },
  {
    initialText: `text for the third page`,
    initialDiffs: [
      {
        file: "ugit/cli.py",
        content: `@@ -0,0 +1,2 @@
+def main():
+    print('Welcome to the third page!')`,
      },
    ],
  },
];

export default function Home() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleNavigate = (newPageIndex: number) => {
    // console.log("Navigating to page", newPageIndex);
    if (newPageIndex >= 1 && newPageIndex <= pages.length) {
      // console.log("Actually to page", newPageIndex);
      setCurrentPageIndex(newPageIndex - 1);
    }
  };

  const currentPage = pages[currentPageIndex];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        <GitDiffViewer
          initialText={currentPage.initialText}
          initialDiffs={currentPage.initialDiffs}
          currentPage={currentPageIndex + 1}
          totalPages={pages.length}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}
