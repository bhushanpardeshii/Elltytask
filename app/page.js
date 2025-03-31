"use client"
import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PageSelector() {
  // Initial state with 8 pages
  const initialPages = {
    all: false,
    page1: false,
    page2: false,
    page3: false,
    page4: false,
    page5: false,
    page6: false,
    page7: false,
    page8: false,
  }

  const [selectedPages, setSelectedPages] = useState(initialPages)
  const [hoveredCheckbox, setHoveredCheckbox] = useState(null)
  const [clickedCheckbox, setClickedCheckbox] = useState(null)

  const handleCheckboxChange = (page) => {
    const isAllPages = page === "all"
    const newValue = !selectedPages[page]

    if (isAllPages) {
      // Set all checkboxes to the same value
      const updatedPages = Object.fromEntries(
        Object.keys(selectedPages).map(key => [key, newValue])
      )
      setSelectedPages(updatedPages)
    } else {
      // Update single checkbox and check if all are selected
      const updatedPages = { ...selectedPages, [page]: newValue }
      const allPagesSelected = Object.keys(updatedPages)
        .filter(key => key !== "all")
        .every(key => updatedPages[key])

      setSelectedPages({ ...updatedPages, all: allPagesSelected })
    }
  }

  const handleClick = (page) => {
    setClickedCheckbox(page)
    setTimeout(() => setClickedCheckbox(null), 150)
    handleCheckboxChange(page)
  }

  const Checkbox = ({ page, isSelected, onHover }) => (
    <div
      className={cn(
        "h-5 w-5 rounded border-[#CDCDCD] border mx-1 flex items-center justify-center transition-all duration-75",
        clickedCheckbox === page && "ring-4 ring-[#5087F8]/20",
        isSelected
          ? onHover
            ? "border-[#5087F8] bg-[#5087F8]"
            : "border-[#2469F6] bg-[#2469F6]"
          : "border-gray-300"
      )}
      onClick={(e) => {
        e.stopPropagation()
        handleClick(page)
      }}
    >
      {isSelected && <Check className="h-4 w-4 text-white" />}
      {!isSelected && onHover && <Check className="h-4 w-4 text-gray-400 opacity-50" />}
    </div>
  )

  const pagesList = Object.keys(selectedPages).filter(key => key !== "all")

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-[370px] bg-white rounded-lg shadow-[0_-1px_8px_rgba(0,0,0,0.15),0_10px_12px_rgba(0,0,0,0.15)] p-6">
        <div className="space-y-4">
          {/* All pages checkbox */}
          <label
            className="flex items-center justify-between cursor-pointer mx-1 py-1"
            onMouseEnter={() => setHoveredCheckbox("all")}
            onMouseLeave={() => setHoveredCheckbox(null)}
            onClick={() => handleClick("all")}
          >
            <span className="text-[14px] leading-[130%] font-normal font-montserrat">All pages</span>
            <Checkbox
              page="all"
              isSelected={selectedPages.all}
              onHover={hoveredCheckbox === "all"}
            />
          </label>

          {/* Pages list */}
          <div className="border-t border-b border-[#CDCDCD] py-2  space-y-3 max-h-[200px] overflow-y-auto scrollbar-hide">
            {pagesList.map((pageKey, index) => (
              <label
                key={pageKey}
                className="flex items-center text-black justify-between cursor-pointer mx-1 py-2"
                onMouseEnter={() => setHoveredCheckbox(pageKey)}
                onMouseLeave={() => setHoveredCheckbox(null)}
                onClick={() => handleClick(pageKey)}
              >
                <span className="text-[14px] leading-[130%] font-normal font-montserrat">Page {index + 1}</span>
                <Checkbox
                  page={pageKey}
                  isSelected={selectedPages[pageKey]}
                  onHover={hoveredCheckbox === pageKey}
                />
              </label>
            ))}
          </div>

          <button
            className="w-full bg-[#FFCE22] hover:bg-[#FFD84D] cursor-pointer text-black py-3 rounded-md mt-2 transition-colors text-[14px] leading-[130%] font-normal font-montserrat"
            onClick={() => console.log("Selected pages:", selectedPages)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

