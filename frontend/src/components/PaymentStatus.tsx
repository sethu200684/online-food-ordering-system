import React from 'react';

interface Props {
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  amount: number;
}

const PaymentStatus: React.FC<Props> = ({ status, amount }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-600';
      case 'PENDING': return 'bg-yellow-100 text-yellow-600';
      case 'FAILED': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="text-gray-700 font-medium">Payment</p>
        <p className="text-orange-500 font-bold">${amount?.toFixed(2)}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle()}`}>
        {status}
      </span>
    </div>
  );
};

export default PaymentStatus;