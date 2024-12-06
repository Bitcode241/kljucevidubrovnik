import React, { useState } from 'react';
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  DollarSign 
} from 'lucide-react';

const Dashboard = ({ onLogout }) => {
  const [stats, setStats] = useState({
    totalInventory: 125,
    totalSales: 45670,
    pendingOrders: 12,
    dailyEarnings: 1245
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kontrolna Ploča</h1>
        <button 
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Odjava
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            icon: <Package className="text-blue-500" size={48} />,
            title: 'Zalihe',
            value: stats.totalInventory,
            description: 'Ukupno artikala'
          },
          { 
            icon: <ShoppingCart className="text-green-500" size={48} />,
            title: 'Prodaja',
            value: stats.totalSales.toLocaleString(),
            description: 'Ukupni promet'
          },
          { 
            icon: <Truck className="text-purple-500" size={48} />,
            title: 'Narudžbe',
            value: stats.pendingOrders,
            description: 'Čekaju na obradu'
          },
          { 
            icon: <DollarSign className="text-yellow-500" size={48} />,
            title: 'Dnevni Prihod',
            value: stats.dailyEarnings.toLocaleString(),
            description: 'Zarada danas'
          }
        ].map((card, index) => (
          <div 
            key={index} 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">{card.title}</h2>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                <p className="text-sm text-gray-500 mt-1">{card.description}</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;