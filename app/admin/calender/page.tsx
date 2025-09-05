"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Days in current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Change month backward
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  // Change month forward
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Select a date
  const handleSelect = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-white-200">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-md mb-6">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">
          {months[currentMonth]} {currentYear}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-2 w-full max-w-md text-center font-medium text-gray-600 mb-2">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2 w-full max-w-md">
        {/* Empty slots before first day */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Month days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          const isSelected =
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear;

          return (
            <button
              key={day}
              onClick={() => handleSelect(day)}
              className={`p-2 rounded-full w-10 h-10 flex items-center justify-center transition
                ${isToday ? "bg-blue-500 text-white" : ""}
                ${isSelected ? "bg-indigo-500 text-white" : "hover:bg-gray-200"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected Date */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-white-200 shadow rounded-lg">
          <p className="text-gray-700">
            Selected Date:{" "}
            <span className="font-semibold">
              {selectedDate.toDateString()}
            </span>
          </p>
        </div>
      )}
        {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-6">
        2025 © Healthcare, All Rights Reserved
      </footer>
    </div>
  );
}
