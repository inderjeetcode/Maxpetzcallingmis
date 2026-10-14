/**
 * In-Dashboard Automated Test Suite Modal
 * Allows operators to trigger real-time verification of Section 14 requirements.
 */

import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Play, ShieldCheck, RefreshCw } from 'lucide-react';
import { executeAllTests, TestResult } from '../test/runTests';

interface AutomatedTestRunnerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AutomatedTestRunner: React.FC<AutomatedTestRunnerProps> = ({
  isOpen,
  onClose,
}) => {
  const [results, setResults] = useState<TestResult[]>(() => executeAllTests());
  const [isRunning, setIsRunning] = useState(false);

  if (!isOpen) return null;

  const handleRerun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setResults(executeAllTests());
      setIsRunning(false);
    }, 400);
  };

  const passedCount = results.filter((r) => r.passed).length;
  const allPassed = passedCount === results.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex flex-col h-[85vh] w-full max-w-4xl border-3 border-black bg-white shadow-[8px_8px_0px_#000]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-3 border-black bg-[#FFE600] p-4 text-black">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-6 w-6 text-black" />
            <div>
              <h2 className="text-base font-black uppercase tracking-tight">
                Section 14: Automated System Test Suite
              </h2>
              <p className="text-xs font-bold text-gray-800">
                Live verification of Google Sheets mapping, KPI metrics, and callback recovery logic
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="border-2 border-black bg-white p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <span
              className={`border-2 border-black px-3 py-1 font-mono text-xs font-black uppercase ${
                allPassed ? 'bg-[#00D26A] text-black' : 'bg-[#FF334B] text-white'
              }`}
            >
              {allPassed ? 'ALL TESTS PASSED (14/14)' : `FAILURES DETECTED (${results.length - passedCount})`}
            </span>
            <span className="text-xs font-bold text-gray-700">
              Verified against raw Max PetZ hospital call dataset
            </span>
          </div>

          <button
            onClick={handleRerun}
            disabled={isRunning}
            className="flex items-center gap-1.5 border-2 border-black bg-black px-3 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0px_#000] hover:bg-neutral-800 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Re-run All Tests'}</span>
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {results.map((res, idx) => (
            <div
              key={idx}
              className={`border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] ${
                res.passed ? 'bg-white' : 'bg-red-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {res.passed ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                  )}
                  <div>
                    <span className="border border-black bg-gray-100 px-1.5 py-0.2 font-mono text-[10px] font-bold uppercase text-gray-800 mr-2">
                      {res.category}
                    </span>
                    <span className="font-mono text-xs font-black text-black">
                      {res.testName}
                    </span>
                  </div>
                </div>
                <span
                  className={`border border-black px-2 py-0.5 font-mono text-[10px] font-black uppercase ${
                    res.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-200 text-red-800'
                  }`}
                >
                  {res.passed ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <p className="mt-2 pl-6 font-mono text-xs font-semibold text-gray-700">
                {res.message}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t-2 border-black p-4 bg-gray-50">
          <span className="font-mono text-xs font-bold text-gray-600">
            Automated testing command: <code className="bg-gray-200 px-1.5 py-0.5 border border-black">npm test</code>
          </span>
          <button
            onClick={onClose}
            className="border-2 border-black bg-black px-4 py-1.5 text-xs font-black text-white hover:bg-neutral-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
