import { useState } from 'react';
import { Truck, Info, CheckCircle2 } from 'lucide-react';

const BookCylinderCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [booked, setBooked] = useState(false);

  const lastDelivery = new Date('2026-05-12');
  const avgDays = (40 + 45 + 42 + 48) / 4; // 43.75
  const predictedEmpty = new Date(lastDelivery);
  predictedEmpty.setDate(predictedEmpty.getDate() + Math.round(avgDays));
  
  const bookingStart = new Date(predictedEmpty);
  bookingStart.setDate(bookingStart.getDate() - 5);
  
  const bookingEnd = new Date(predictedEmpty);
  bookingEnd.setDate(bookingEnd.getDate() - 2);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleConfirm = () => {
    setBooked(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Truck className="text-orange-500" /> Book Cylinder
      </h2>

      {/* AI Booking Assistant */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
          <Info size={16} /> <span>AI Booking Assistant</span>
        </div>
        <p className="text-sm text-amber-900 leading-relaxed">
          Based on your last 4 cylinders and family size, your current cylinder may last till <strong>{formatDate(predictedEmpty)}</strong>. We recommend booking between <strong>{formatDate(bookingStart)}</strong> and <strong>{formatDate(bookingEnd)}</strong>.
        </p>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <p className="text-sm text-gray-600">Last Delivery: <strong className="text-gray-900">12 May 2026</strong></p>
        <p className="text-sm text-gray-600">Status: <strong className="text-green-600">Eligible for Booking</strong></p>
      </div>

      <div className="mt-2">
        <button 
          onClick={() => setShowModal(true)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors shadow-sm"
        >
          Book Now
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">OTP will be sent to your registered mobile number upon dispatch.</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden p-6">
            {!booked ? (
              <>
                <h3 className="font-bold text-lg text-gray-900 mb-4">Confirm Cylinder Booking</h3>
                <div className="space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p><strong>Cylinder Type:</strong> 14.2 kg LPG</p>
                  <p><strong>Distributor:</strong> Assam Gas Agency (IOCL)</p>
                  <p><strong>Expected Delivery:</strong> Within 48–96 hours</p>
                  <p><strong>OTP:</strong> Will be sent to +91-XXXXXX7890 on dispatch</p>
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleConfirm} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg transition-colors">
                    Confirm Booking
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4 flex flex-col items-center gap-3 animate-in zoom-in-95 duration-300">
                <CheckCircle2 size={48} className="text-green-500" />
                <h3 className="font-bold text-lg text-gray-900">Booking Confirmed!</h3>
                <p className="text-sm text-gray-600">Booking ID: <strong className="text-gray-900 font-mono">BK-2026-00789</strong></p>
                <p className="text-xs text-gray-500 mt-2">Track in Delivery History.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCylinderCard;
