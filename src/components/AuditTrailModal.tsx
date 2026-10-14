/**
 * Audit Trail Modal component
 * Displays chronological log of all staff callback status updates & overrides.
 */

import React from 'react';
import { X, History, FileText } from 'lucide-react';
import { CallbackAuditLog } from '../types/callAnalytics';

interface AuditTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: CallbackAuditLog[];
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({
  isOpen,
  onClose,
  logs,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex flex-col h-[80vh] w-full max-w-3xl border-3 border-black bg-white shadow-[6px_6px_0px_#000]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black p-4">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-black" />
            <h3 className="text-base font-black uppercase text-black">
              Callback Audit Trail ({logs.length} events)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="border-2 border-black p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 text-gray-500 font-bold">
              <FileText className="h-8 w-8 mb-2 opacity-50" />
              <span>No audit logs recorded yet. Manual callback confirmations will appear here.</span>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="border-2 border-black bg-gray-50 p-3 text-xs shadow-[2px_2px_0px_#000]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-black">
                      UID: {log.missedCallUid}
                    </span>
                    <span className="border border-black bg-[#FFE600] px-1.5 py-0.2 font-mono font-bold text-[10px]">
                      {log.previousStatus} → {log.newStatus}
                    </span>
                  </div>
                  <div className="font-mono text-gray-600">
                    {new Date(log.timestamp).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                    })}
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-gray-700">
                    Verified By: <span className="font-black text-black">{log.changedBy}</span>
                  </span>
                  {log.note && (
                    <span className="font-semibold text-gray-800 bg-white border border-black px-2 py-0.5">
                      Note: "{log.note}"
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-black p-3 text-right">
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
