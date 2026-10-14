/**
 * Callback Triage and Staff Verification Modal
 * Enables staff to audit, confirm, or reject callback recovery attempts.
 */

import React, { useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, UserCheck } from 'lucide-react';
import { CallbackMatch, CallbackMatchStatus } from '../types/callAnalytics';

interface CallbackTriageModalProps {
  match: CallbackMatch | null;
  onClose: () => void;
  onConfirmCallback: (
    missedCallUid: string,
    status: CallbackMatchStatus,
    verifiedBy: string,
    notes: string
  ) => Promise<void>;
}

export const CallbackTriageModal: React.FC<CallbackTriageModalProps> = ({
  match,
  onClose,
  onConfirmCallback,
}) => {
  const [verifiedBy, setVerifiedBy] = useState('Staff Agent');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!match) return null;

  const handleSubmit = async (status: CallbackMatchStatus) => {
    setIsSubmitting(true);
    try {
      await onConfirmCallback(match.missedCallUid, status, verifiedBy, notes);
      onClose();
    } catch (err) {
      console.error('Failed to submit verification:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl border-3 border-black bg-white p-5 shadow-[6px_6px_0px_#000]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-black" />
            <h3 className="text-base font-black uppercase text-black">
              Staff Callback Verification
            </h3>
          </div>
          <button
            onClick={onClose}
            className="border-2 border-black p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Call Details Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-2 border-black bg-gray-50 p-3 text-xs">
          <div>
            <span className="font-bold text-gray-500 uppercase">Missed Call UID:</span>
            <p className="font-mono font-black text-black break-all">{match.missedCallUid}</p>
          </div>
          <div>
            <span className="font-bold text-gray-500 uppercase">Missed Call Time:</span>
            <p className="font-mono font-bold text-black">{match.missedCallTimestamp}</p>
          </div>
          <div>
            <span className="font-bold text-gray-500 uppercase">Customer Number:</span>
            <p className="font-mono font-black text-black">{match.maskedPhone}</p>
          </div>
          <div>
            <span className="font-bold text-gray-500 uppercase">Department:</span>
            <p className="font-bold text-black">{match.department || 'General'}</p>
          </div>
          <div>
            <span className="font-bold text-gray-500 uppercase">Matched Outgoing Call:</span>
            <p className="font-mono font-bold text-black">
              {match.outgoingCallUid || 'No automatic match found'}
            </p>
          </div>
          <div>
            <span className="font-bold text-gray-500 uppercase">Time to Callback:</span>
            <p className="font-mono font-bold text-black">
              {match.timeTakenMinutes !== undefined ? `${match.timeTakenMinutes} minutes` : 'Pending'}
            </p>
          </div>
          <div className="col-span-2">
            <span className="font-bold text-gray-500 uppercase">Current Status:</span>
            <div className="mt-1">
              <span className="border-2 border-black bg-[#FFE600] px-2 py-0.5 font-mono font-black text-xs text-black">
                {match.status}
              </span>
              <span className="ml-2 font-bold text-gray-600">
                Confidence: {match.matchConfidence}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Form */}
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1">
              Verified By (Staff Name / Extension):
            </label>
            <input
              type="text"
              value={verifiedBy}
              onChange={(e) => setVerifiedBy(e.target.value)}
              className="w-full border-2 border-black p-2 text-xs font-bold focus:outline-none focus:bg-yellow-50"
              placeholder="e.g. Shivani Jaiswal ext. 17"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-black mb-1">
              Audit Note / Client Resolution Summary:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full border-2 border-black p-2 text-xs font-bold focus:outline-none focus:bg-yellow-50"
              placeholder="e.g. Called client back, scheduled appointment with Dr. Tarun..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t-2 border-black pt-4">
          <button
            type="button"
            onClick={onClose}
            className="border-2 border-black bg-white px-3 py-1.5 text-xs font-bold hover:bg-gray-100"
          >
            Cancel
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {match.status === 'Ambiguous Match' && (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSubmit('Confirmed Successful')}
                className="flex items-center gap-1.5 border-2 border-black bg-[#FFE600] px-3 py-1.5 text-xs font-black text-black shadow-[2px_2px_0px_#000] hover:bg-yellow-300"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Resolve Ambiguity as Success</span>
              </button>
            )}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit('Confirmed Unsuccessful')}
              className="flex items-center gap-1.5 border-2 border-black bg-[#FF334B] px-3 py-1.5 text-xs font-black text-white shadow-[2px_2px_0px_#000] hover:bg-red-700"
            >
              <XCircle className="h-4 w-4" />
              <span>Mark Unsuccessful</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit('Confirmed Successful')}
              className="flex items-center gap-1.5 border-2 border-black bg-[#00D26A] px-3 py-1.5 text-xs font-black text-black shadow-[2px_2px_0px_#000] hover:bg-emerald-400"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Confirm Successful Callback</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
