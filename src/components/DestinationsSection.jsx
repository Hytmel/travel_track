import React from 'react';

function DestinationsSection({ destinations = [], editingIdx, setEditingIdx, handleDestinationChange, handleDestinationKeyDown, handleDestinationBlur, ArrowBetweenDestinations, ArrowBetweenDestinationsB }) {
  return (
    <div className="mb-6">
      <div className="text-[24px] font-semibold mb-6" style={{ color: '#197CAC' }}>Destinations</div>
      <div className="flex items-center gap-4 mb-4">
        {destinations.map((dest, idx) => (
          <React.Fragment key={idx}>
            {idx < destinations.length - 1 ? (
              <span
                className="font-poppins"
                style={{
                  color: '#667085',
                  fontSize: 16,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 300,
                }}
              >
                {dest}
              </span>
            ) : editingIdx === idx ? (
              <input
                className="bg-transparent border-none outline-none font-poppins min-w-[120px] px-0 py-0"
                style={{
                  boxShadow: 'none',
                  fontSize: 16,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#667085',
                  fontWeight: 300,
                }}
                autoFocus
                value={dest}
                onChange={e => handleDestinationChange(idx, e.target.value)}
                onKeyDown={e => handleDestinationKeyDown(e, idx)}
                onBlur={() => handleDestinationBlur(idx)}
                placeholder={"Add destination.."}
              />
            ) : (
              <span
                className="font-poppins cursor-pointer min-w-[120px]"
                onClick={() => setEditingIdx(idx)}
                style={{
                  color: '#667085',
                  fontSize: 16,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 300,
                }}
              >
                {dest.trim() ? dest : "Add destination.."}
              </span>
            )}
            {idx < destinations.length - 1 && (
              idx % 2 === 0 ? <ArrowBetweenDestinations /> : <ArrowBetweenDestinationsB />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default DestinationsSection; 