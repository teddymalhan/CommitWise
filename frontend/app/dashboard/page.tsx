"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Plus, Home, Settings, HelpCircle, LogOut, ChevronDown, Trash2 } from "lucide-react"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Project {
    id: string
    name: string
    branch: string
    model: string
    createdAt: Date
    backdrop: string
    url: string
}

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([])

    const [newProjectUrl, setNewProjectUrl] = useState("")
    const [isUrlValid, setIsUrlValid] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState("")
    const [selectedModel, setSelectedModel] = useState("")

    const sideMenuItems = [
        { icon: Home, label: "Home", color: "bg-red-500" },
        { icon: Settings, label: "Settings", color: "bg-green-500" },
        { icon: HelpCircle, label: "Help", color: "bg-blue-500" },
        { icon: LogOut, label: "Logout", color: "bg-yellow-500" }
    ]

    const validateUrl = (url: string) => {
        // This is a simple validation. In a real app, you'd want to do more thorough checking.
        const isValid = url.startsWith('https://github.com/') || url.startsWith('http://github.com/')  || url.includes('git')
        setIsUrlValid(isValid)
        setNewProjectUrl(url)
    }

    const addProject = () => {
        if (isUrlValid && selectedBranch && selectedModel) {

            const Author = "leshenko"
            const Repo = "ugit"

            if (newProjectUrl != "https://www.leshenko.net/p/ugit/repo/") {
                const urlParts = new URL(newProjectUrl).pathname.split('/')
                const Author = urlParts[1]
                const Repo = urlParts[2]
            }

            const newProject: Project = {
                id: (projects.length + 1).toString(),
                name: `${Author}/${Repo}`,
                branch: selectedBranch,
                model: selectedModel,
                createdAt: new Date(),
                backdrop: `linear-gradient(135deg, ${getRandomColor()} 10%, ${getRandomColor()} 100%)`,
                url: newProjectUrl
            }
            setProjects([...projects, newProject])
            setNewProjectUrl("")
            setSelectedBranch("")
            setSelectedModel("")
            setIsUrlValid(false)
        }
    }

    const deleteProject = (id: string) => {
        setProjects(projects.filter(project => project.id !== id))
    }

    const getRandomColor = () => {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Side Menu */}
            <div className="w-20 bg-gray-800 flex flex-col items-center py-4 border-r-4 border-black">
                {sideMenuItems.map((item, index) => (
                    <div key={index} className={`mb-4 p-2 ${item.color} rounded-lg border-4 border-black`}>
                        <Button variant="ghost" size="icon" className="text-white">
                            <item.icon className="h-6 w-6" />
                            <span className="sr-only">{item.label}</span>
                        </Button>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navigation Bar */}
                <nav className="flex justify-between items-center p-4 bg-red-500 border-b-4 border-black">
                    <div className="w-1/3"></div>
                    <Link href="/"><h1 className="text-2xl font-bold">CommitWise</h1></Link>
                    <div className="w-1/3 flex justify-end">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-red-600">
                            <User className="h-6 w-6" />
                            <span className="sr-only">User profile</span>
                        </Button>
                    </div>
                </nav>

                {/* Project List or Add Project Message */}
                <ScrollArea className="flex-1 p-6 bg-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Card key={project.id} className="bg-gray-700 border-4 border-black overflow-hidden flex flex-col">
                                <div
                                    className="h-32"
                                    style={{ background: project.backdrop }}
                                ></div>
                                <CardHeader className="bg-gray-600 border-t-4 border-black">
                                    <CardTitle className="flex justify-between items-center text-white">
                                        {project.name}
                                        <ChevronDown className="h-4 w-4" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="bg-gray-800 p-4 flex flex-col flex-grow">
                                    <div className="flex-grow">
                                        <p className="text-green-300">Branch: <span className="text-white">{project.branch}</span></p>
                                        <p className="text-green-300">Model: <span className="text-white">{project.model}</span></p>
                                        <p className="text-green-300">Created: <span className="text-white">{project.createdAt.toLocaleDateString()}</span></p>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <Link href={`/project/${project.id}`}>
                                        <Button variant="outline" className="flex-grow mr-2 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                                            Open Project
                                        </Button>
                                        </Link>
                                        <Button variant="outline" className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => deleteProject(project.id)}>
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Card className="bg-gray-700 border-4 border-black overflow-hidden flex flex-col cursor-pointer">
                                    <div className="h-32 bg-gray-600"></div>
                                    <CardHeader className="bg-gray-600 border-t-4 border-black">
                                        <CardTitle className="flex justify-between items-center text-white">
                                            New Project
                                            <ChevronDown className="h-4 w-4" />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="bg-gray-800 p-4 flex flex-col flex-grow">
                                        <div className="flex-grow flex items-center justify-center">
                                            <Plus className="h-12 w-12 text-green-500" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-700 border-4 border-black">
                                <DialogHeader>
                                    <DialogTitle className="text-white">Add New Project</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="url" className="text-right text-white">
                                            URL
                                        </Label>
                                        <Input
                                            id="url"
                                            value={newProjectUrl}
                                            onChange={(e) => validateUrl(e.target.value)}
                                            className="col-span-3 bg-gray-800 text-white border-2 border-green-500"
                                            placeholder="https://github.com/user/repo"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="branch" className="text-right text-white">
                                            Branch
                                        </Label>
                                        <Select onValueChange={setSelectedBranch} disabled={!isUrlValid}>
                                            <SelectTrigger className="col-span-3 bg-gray-800 text-white border-2 border-green-500">
                                                <SelectValue placeholder="Select branch" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 text-white">
                                                <SelectItem value="main">main</SelectItem>
                                                <SelectItem value="develop">develop</SelectItem>
                                                <SelectItem value="feature">feature</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="model" className="text-right text-white">
                                            Model
                                        </Label>
                                        <Select onValueChange={setSelectedModel} disabled={!isUrlValid}>
                                            <SelectTrigger className="col-span-3 bg-gray-800 text-white border-2 border-green-500">
                                                <SelectValue placeholder="Select model" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 text-white">
                                                <SelectItem value="LLaMA 3.1">LLaMA 3.1</SelectItem>
                                                <SelectItem value="GPT-4">GPT-4</SelectItem>
                                                <SelectItem value="BERT">BERT</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Button onClick={addProject} disabled={!isUrlValid || !selectedBranch || !selectedModel} className="w-full bg-green-500 text-black border-4 border-black hover:bg-green-600">
                                    Add Project
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
