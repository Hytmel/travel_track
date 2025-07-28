import React from 'react';
import { MoneyIcon } from './Icons';

function BudgetOverview({ totalBudget = 30000, totalCost = 30000, remainingCost = 30000 }) {
  return (
    <div className="mb-8 font-poppins">
      
             <div className="flex gap-8">
         {/* Total Budget Card */}
                   <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="text-lg font-medium mb-2" style={{ color: '#3ABEFF' }}>
            Total Budget
          </div>
          <div className="flex items-center justify-center mb-2">
            <MoneyIcon color="#3ABEFF" />
          </div>
          <div className="text-xl font-bold text-center" style={{ color: '#3ABEFF' }}>
            <span>{totalBudget.toLocaleString()}</span>
            <span className="text-base font-bold ml-1">DA</span>
          </div>
        </div>

                                   {/* Total Cost Card */}
          <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="text-lg font-medium mb-2" style={{ color: '#F59E0B' }}>
            Total Cost
          </div>
          <div className="flex items-center justify-center mb-2">
            <MoneyIcon color="#F59E0B" />
          </div>
          <div className="text-xl font-bold text-center" style={{ color: '#F59E0B' }}>
            <span>{totalCost.toLocaleString()}</span>
            <span className="text-base font-bold ml-1">DA</span>
          </div>
        </div>

                                   {/* Remaining Cost Card */}
          <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="text-lg font-medium mb-2" style={{ color: '#10B981' }}>
            Remaining Cost
          </div>
          <div className="flex items-center justify-center mb-2">
            <MoneyIcon color="#10B981" />
          </div>
          <div className="text-xl font-bold text-center" style={{ color: '#10B981' }}>
            <span>{remainingCost.toLocaleString()}</span>
            <span className="text-base font-bold ml-1">DA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetOverview; 