import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Bell, ChevronDown, TrendingUp, BarChart2, DollarSign, Globe, AlertTriangle, Search, Clock } from 'lucide-react';

// Dados simulados
const stockData = [
  { name: 'PETR4', value: 28.45, change: 1.2, volume: 15000000, pe: 8.2, dy: 7.5, beta: 1.3, sector: 'Petróleo' },
  { name: 'VALE3', value: 65.30, change: -0.8, volume: 12000000, pe: 5.6, dy: 9.2, beta: 1.5, sector: 'Mineração' },
  { name: 'ITUB4', value: 32.15, change: 0.5, volume: 9000000, pe: 9.8, dy: 5.6, beta: 0.9, sector: 'Financeiro' },
  { name: 'BBDC4', value: 15.75, change: -0.3, volume: 8500000, pe: 8.9, dy: 6.2, beta: 1.1, sector: 'Financeiro' },
  { name: 'ABEV3', value: 12.90, change: 0.1, volume: 7200000, pe: 15.3, dy: 4.8, beta: 0.7, sector: 'Bebidas' }
];

const priceHistory = [
  { date: 'Jan', PETR4: 23.5, VALE3: 62.1, ITUB4: 30.2, BBDC4: 14.8, ABEV3: 12.5 },
  { date: 'Fev', PETR4: 24.2, VALE3: 63.4, ITUB4: 29.8, BBDC4: 15.1, ABEV3: 12.4 },
  { date: 'Mar', PETR4: 25.1, VALE3: 64.2, ITUB4: 31.5, BBDC4: 15.3, ABEV3: 12.6 },
  { date: 'Abr', PETR4: 26.3, VALE3: 65.6, ITUB4: 32.0, BBDC4: 15.5, ABEV3: 12.7 },
  { date: 'Mai', PETR4: 28.4, VALE3: 65.3, ITUB4: 32.1, BBDC4: 15.7, ABEV3: 12.9 }
];

const alertsData = [
  { id: 1, asset: 'PETR4', type: 'Suporte', message: 'Próximo ao suporte em R$27,80', time: '10 min atrás', priority: 'high' },
  { id: 2, asset: 'VALE3', type: 'Resistência', message: 'Testando resistência em R$66,00', time: '25 min atrás', priority: 'medium' },
  { id: 3, asset: 'BBDC4', type: 'Cruzamento MM', message: 'MM9 cruzou acima da MM21', time: '40 min atrás', priority: 'high' },
  { id: 4, asset: 'ITUB4', type: 'Dividendos', message: 'Data ex-dividendos em 3 dias', time: '1h atrás', priority: 'low' }
];

const sectorData = [
  { name: 'Financeiro', value: 35 },
  { name: 'Petróleo', value: 20 },
  { name: 'Mineração', value: 15 },
  { name: 'Varejo', value: 12 },
  { name: 'Bebidas', value: 8 },
  { name: 'Outros', value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const InvestmentHub = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [selectedStock, setSelectedStock] = useState('PETR4');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAlerts, setFilteredAlerts] = useState(alertsData);

  useEffect(() => {
    // Filtragem de alertas com base no termo de pesquisa
    setFilteredAlerts(
      alertsData.filter(alert => 
        alert.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hub de Investimento</h1>
          <div className="flex space-x-4 items-center">
            <Bell className="h-5 w-5" />
            <div className="flex items-center">
              <span>Mercado Nacional</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="flex p-2">
          <button 
            className={px-4 py-2 flex items-center ${selectedTab === 'dashboard' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600'}}
            onClick={() => setSelectedTab('dashboard')}
          >
            <BarChart2 className="h-4 w-4 mr-2" /> Dashboard
          </button>
          <button 
            className={px-4 py-2 flex items-center ${selectedTab === 'fundamental' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600'}}
            onClick={() => setSelectedTab('fundamental')}
          >
            <DollarSign className="h-4 w-4 mr-2" /> Análise Fundamentalista
          </button>
          <button 
            className={px-4 py-2 flex items-center ${selectedTab === 'technical' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600'}}
            onClick={() => setSelectedTab('technical')}
          >
            <TrendingUp className="h-4 w-4 mr-2" /> Análise Técnica
          </button>
          <button 
            className={px-4 py-2 flex items-center ${selectedTab === 'global' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600'}}
            onClick={() => setSelectedTab('global')}
          >
            <Globe className="h-4 w-4 mr-2" /> Mercado Global
          </button>
          <button 
            className={px-4 py-2 flex items-center ${selectedTab === 'alerts' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-600'}}
            onClick={() => setSelectedTab('alerts')}
          >
            <AlertTriangle className="h-4 w-4 mr-2" /> Alertas
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        {selectedTab === 'dashboard' && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Evolução de Preços</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={selectedStock} stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex space-x-2 mt-4">
                {stockData.map(stock => (
                  <button
                    key={stock.name}
                    className={px-3 py-1 text-sm rounded ${selectedStock === stock.name ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}}
                    onClick={() => setSelectedStock(stock.name)}
                  >
                    {stock.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-4 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Distribuição Setorial</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => ${name} ${(percent * 100).toFixed(0)}%}
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={cell-${index}} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-span-12 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Ações em Destaque</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cotação</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variação</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P/L</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DY</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beta</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setor</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stockData.map((stock) => (
                      <tr key={stock.name}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{stock.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">R$ {stock.value.toFixed(2)}</td>
                        <td className={px-6 py-4 whitespace-nowrap ${stock.change > 0 ? 'text-green-600' : stock.change < 0 ? 'text-red-600' : 'text-gray-500'}}>
                          {stock.change > 0 ? '+' : ''}{stock.change}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{(stock.volume / 1000000).toFixed(1)}M</td>
                        <td className="px-6 py-4 whitespace-nowrap">{stock.pe}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{stock.dy}%</td>
                        <td className="px-6 py-4 whitespace-nowrap">{stock.beta}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{stock.sector}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {selectedTab === 'fundamental' && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 bg-white p-4 rounded-lg shadow mb-4">
              <h2 className="text-xl font-semibold mb-4">Análise Fundamentalista</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Selecione a Ação</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
                      {stockData.map(stock => (
                        <option key={stock.name} value={stock.name}>{stock.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Período de Análise</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                      <option>Últimos 12 meses</option>
                      <option>Últimos 3 anos</option>
                      <option>Últimos 5 anos</option>
                      <option>Desde o IPO</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-4 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Indicadores Fundamentalistas</h3>
              <div className="space-y-4">
                {stockData.find(s => s.name === selectedStock) && (
                  <>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">P/L</span>
                      <span className="font-medium">{stockData.find(s => s.name === selectedStock).pe}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Dividend Yield</span>
                      <span className="font-medium">{stockData.find(s => s.name === selectedStock).dy}%</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">P/VP</span>
                      <span className="font-medium">1.8</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">ROE</span>
                      <span className="font-medium">15.3%</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Margem Líquida</span>
                      <span className="font-medium">18.7%</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Dívida Líquida/EBITDA</span>
                      <span className="font-medium">1.2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CAGR Receita (5 anos)</span>
                      <span className="font-medium">7.5%</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="col-span-8 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Evolução de Indicadores</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { year: '2020', valor: 5.2 },
                      { year: '2021', valor: 6.1 },
                      { year: '2022', valor: 7.5 },
                      { year: '2023', valor: 8.3 },
                      { year: '2024', valor: 7.8 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="valor" fill="#8884d8" name="Dividend Yield (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Análise Comparativa Setorial</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P/L</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DY</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROE</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margem EBITDA</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">PETR4</td>
                        <td className="px-6 py-4 whitespace-nowrap">8.2</td>
                        <td className="px-6 py-4 whitespace-nowrap">7.5%</td>
                        <td className="px-6 py-4 whitespace-nowrap">15.3%</td>
                        <td className="px-6 py-4 whitespace-nowrap">28.7%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">PETR3</td>
                        <td className="px-6 py-4 whitespace-nowrap">8.1</td>
                        <td className="px-6 py-4 whitespace-nowrap">7.3%</td>
                        <td className="px-6 py-4 whitespace-nowrap">15.2%</td>
                        <td className="px-6 py-4 whitespace-nowrap">28.7%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">CSAN3</td>
                        <td className="px-6 py-4 whitespace-nowrap">12.5</td>
                        <td className="px-6 py-4 whitespace-nowrap">4.2%</td>
                        <td className="px-6 py-4 whitespace-nowrap">12.8%</td>
                        <td className="px-6 py-4 whitespace-nowrap">22.1%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">PRIO3</td>
                        <td className="px-6 py-4 whitespace-nowrap">9.8</td>
                        <td className="px-6 py-4 whitespace-nowrap">5.1%</td>
                        <td className="px-6 py-4 whitespace-nowrap">18.4%</td>
                        <td className="px-6 py-4 whitespace-nowrap">33.5%</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">Média Setor</td>
                        <td className="px-6 py-4 whitespace-nowrap">9.6</td>
                        <td className="px-6 py-4 whitespace-nowrap">6.0%</td>
                        <td className="px-6 py-4 whitespace-nowrap">15.4%</td>
                        <td className="px-6 py-4 whitespace-nowrap">28.2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTab === 'technical' && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 bg-white p-4 rounded-lg shadow mb-4">
              <h2 className="text-xl font-semibold mb-4">Análise Técnica</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Selecione a Ação</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
                      {stockData.map(stock => (
                        <option key={stock.name} value={stock.name}>{stock.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Período</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                      <option>Diário</option>
                      <option>Semanal</option>
                      <option>Mensal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-8 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Gráfico de Preços e Volumes</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={selectedStock} stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex mt-4 space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">Candlestick</button>
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">Linha</button>
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">MM9</button>
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">MM21</button>
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">MACD</button>
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">RSI</button>
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">Bollinger</button>
                <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded">Fibonacci</button>
              </div>
            </div>
            
            <div className="col-span-4 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Resumo Técnico</h3>
              <div className="space-y-4">
                <div className="bg-green-100 p-3 rounded-md">
                  <h4 className="font-medium text-green-800">Recomendação: Compra</h4>
                  <p className="text-sm text-green-700 mt-1">MM9 acima da MM21, suporte em R$27,80</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Tendência de curto prazo</span>
                    <span className="font-medium text-green-600">Alta</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Tendência de médio prazo</span>
                    <span className="font-medium text-green-600">Alta</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Tendência de longo prazo</span>
                    <span className="font-medium text-gray-600">Lateral</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">RSI (14)</span>
                    <span className="font-medium">62</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Suporte 1</span>
                    <span className="font-medium">R$ 27,80</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Suporte 2</span>
                    <span className="font-medium">R$ 26,50</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Resistência 1</span>
                    <span className="font-medium">R$ 29,20</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Resistência 2</span>
                    <span className="font-medium">R$ 30,40</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volume relativo</span>
                    <span className="font-medium">1.2x média</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Sinais Técnicos</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-green-50 p-3 rounded-md">
                  <h4 className="font-medium">Médias Móveis</h4>
                  <p className="text-sm text-green-700">Compra (9 cruza acima de 21)</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <h4 className="font-medium">MACD</h4>
                  <p className="text-sm text-green-700">Sinal de compra (cruzamento)</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md">
                  <h4 className="font-medium">RSI</h4>
                  <p className="text-sm text-yellow-700">Neutro (62)</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <h4 className="font-medium">Bollinger</h4>
                  <p className="text-sm text-green-700">Teste da banda superior</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTab === 'global' && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 bg-white p-4 rounded-lg shadow mb-4">
              <h2 className="text-xl font-semibold mb-4">Mercado Global</h2>
              <div className="grid grid-cols-5 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">S&P 500</h3>
                  <div className="text-2xl font-semibold mt-2">4,823.15</div>
                  <div className="text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" /> +0.4%
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Nasdaq</h3>
                  <div className="text-2xl font-semibold mt-2">18,325.21</div>
                  <div className="text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" /> +0.6%
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Dow Jones</h3>
                  <div className="text-2xl font-semibold mt-2">37,852.60</div>
                  <div className="text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" /> +0.2%
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">EUR/USD</h3>
                  <div className="text-2xl font-semibold mt-2">1.085</div>
                  <div className="text-red-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" style={{ transform: 'rotate(180deg)' }} /> -0.1%
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Petróleo</h3>
                  <div className="text-2xl font-semibold mt-2">$78.45</div>
                  <div className="text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" /> +1.8%
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-8 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Desempenho por Região</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'S&P 500 (EUA)', value: 0.4 },
                      { name: 'Nasdaq (EUA)', value: 0.6 },
                      { name: 'FTSE 100 (UK)', value: -0.2 },
                      { name: 'DAX (Alemanha)', value: 0.3 },
                      { name: 'Nikkei (Japão)', value: 1.2 },
                      { name: 'Hang Seng (Hong Kong)', value: -0.5 },
                      { name: 'SSE (China)', value: -0.8 },
                      { name: 'Bovespa (Brasil)', value: 0.5 }
                    ]}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[-1, 1.5]} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Bar 
                      dataKey="value" 
                      nameKey="name"
                      fill={(entry) => entry.value > 0 ? '#22c55e' : '#ef4444'}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="col-span-4 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">ADRs Brasileiras</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">PBR (Petrobras)</span>
                  <div className="flex items-center">
                    <span className="mr-2">$14.85</span>
                    <span className="text-green-600">+1.8%</span>
                  </div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">VALE (Vale)</span>
                  <div className="flex items-center">
                    <span className="mr-2">$12.30</span>
                    <span className="text-red-600">-0.6%</span>
                  </div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">ITUB (Itaú)</span>
                  <div className="flex items-center">
                    <span className="mr-2">$6.45</span>
                    <span className="text-green-600">+0.4%</span>
                  </div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">BBD (Bradesco)</span>
                  <div className="flex items-center">
                    <span className="mr-2">$3.12</span>
                    <span className="text-green-600">+0.2%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">ABEV (Ambev)</span>
                  <div className="flex items-center">
                    <span className="mr-2">$2.55</span>
                    <span className="text-red-600">-0.1%</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-8 mb-4">ETFs Globais</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">SPY (S&P 500)</span>
                  <div className="flex items-center">
                    <span className="mr-2">$480.25</span>
                    <span className="text-green-600">+0.4%</span>
                  </div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">QQQ (Nasdaq)</span>
                  <div className="flex items-center">
                    <span className="mr-2">$445.70</span>
                    <span className="text-green-600">+0.6%</span>
                  </div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">EWZ (Brasil)</span>
                  <div className="flex items-center">
                    <span className="mr-2">$32.15</span>
                    <span className="text-green-600">+0.5%</span>
                  </div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">GLD (Ouro)</span>
                  <div className="flex items-center">
                    <span className="mr-2">$198.40</span>
                    <span className="text-green-600">+0.2%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">BND (Bonds)</span>
                  <div className="flex items-center">
                    <span className="mr-2">$71.30</span>
                    <span className="text-red-600">-0.1%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Notícias Globais em Destaque</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-2">Financial Times • 2h atrás</div>
                  <h4 className="text-lg font-medium mb-2">Fed sinaliza manutenção da taxa de juros na próxima reunião</h4>
                  <p className="text-gray-600">Presidente do Fed indica que a instituição deve aguardar mais dados econômicos antes de iniciar ciclo de cortes.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-2">Bloomberg • 4h atrás</div>
                  <h4 className="text-lg font-medium mb-2">China anuncia novos estímulos para o setor imobiliário</h4>
                  <p className="text-gray-600">Governo chinês lança pacote de medidas para impulsionar o mercado imobiliário em dificuldades.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-2">Reuters • 5h atrás</div>
                  <h4 className="text-lg font-medium mb-2">Preço do petróleo sobe com tensões no Oriente Médio</h4>
                  <p className="text-gray-600">Conflitos na região aumentam preocupações sobre oferta global de petróleo, elevando cotações.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTab === 'alerts' && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Alertas de Oportunidades</h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar alertas..."
                      className="pl-9 pr-4 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <select className="pl-3 pr-8 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>Todos os tipos</option>
                    <option>Suporte/Resistência</option>
                    <option>Cruzamento MM</option>
                    <option>RSI</option>
                    <option>Dividendos</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ativo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensagem</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAlerts.map((alert) => (
                      <tr key={alert.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            alert.priority === 'high' ? 'bg-red-100 text-red-800' : 
                            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }}>
                            {alert.priority === 'high' ? 'Alta' : 
                             alert.priority === 'medium' ? 'Média' : 'Baixa'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{alert.asset}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{alert.type}</td>
                        <td className="px-6 py-4">{alert.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {alert.time}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded">Ver</button>
                            <button className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded">Ignorar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Configurar Alertas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Alertas Técnicos</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input id="mm-cross" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="mm-cross" className="ml-2 block text-sm text-gray-700">Cruzamento de Médias Móveis</label>
                      </div>
                      <div className="flex items-center">
                        <input id="rsi-overbought" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="rsi-overbought" className="ml-2 block text-sm text-gray-700">RSI Sobrecomprado/Sobrevendido</label>
                      </div>
                      <div className="flex items-center">
                        <input id="support-resistance" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked />
                        <label htmlFor="support-resistance" className="ml-2 block text-sm text-gray-700">Teste de Suporte/Resistência</label>
                      </div>
                      <div className="flex items-center">
                        <input id="volume-spike" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="volume-spike" className="ml-2 block text-sm text-gray-700">Picos de Volume</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Alertas Fundamentalistas</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input id="dividends" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked />
                        <label htmlFor="dividends" className="ml-2 block text-sm text-gray-700">Pagamento de Dividendos</label>
                      </div>
                      <div className="flex items-center">
                        <input id="earnings" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="earnings" className="ml-2 block text-sm text-gray-700">Divulgação de Resultados</label>
                      </div>
                      <div className="flex items-center">
                        <input id="valuation" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="valuation" className="ml-2 block text-sm text-gray-700">Mudança de Valuation</label>
                      </div>
                      <div className="flex items-center">
                        <input id="insider" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="insider" className="ml-2 block text-sm text-gray-700">Movimentação de Insiders</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Day Trade</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input id="gap-open" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="gap-open" className="ml-2 block text-sm text-gray-700">Gap de Abertura</label>
                      </div>
                      <div className="flex items-center">
                        <input id="intraday-pattern" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked />
                        <label htmlFor="intraday-pattern" className="ml-2 block text-sm text-gray-700">Padrões Gráficos Intraday</label>
                      </div>
                      <div className="flex items-center">
                        <input id="breakout" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="breakout" className="ml-2 block text-sm text-gray-700">Rompimento de Consolidação</label>
                      </div>
                      <div className="flex items-center">
                        <input id="liquidity" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="liquidity" className="ml-2 block text-sm text-gray-700">Ações com Alta Liquidez</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Renda Fixa</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input id="treasury-yield" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="treasury-yield" className="ml-2 block text-sm text-gray-700">Mudança Significativa no Tesouro Direto</label>
                      </div>
                      <div className="flex items-center">
                        <input id="new-cdb" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked />
                        <label htmlFor="new-cdb" className="ml-2 block text-sm text-gray-700">Novos CDBs com Taxas Atrativas</label>
                      </div>
                      <div className="flex items-center">
                        <input id="debentures" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="debentures" className="ml-2 block text-sm text-gray-700">Emissão de Debêntures</label>
                      </div>
                      <div className="flex items-center">
                        <input id="selic" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="selic" className="ml-2 block text-sm text-gray-700">Mudança na Taxa Selic</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                  Salvar Configurações
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-sm">
        <div className="flex justify-between items-center">
          <div>© 2025 Hub de Investimento - Todos os direitos reservados</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">Termos de Uso</a>
            <a href="#" className="hover:text-blue-400">Política de Privacidade</a>
            <a href="#" className="hover:text-blue-400">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InvestmentHub;