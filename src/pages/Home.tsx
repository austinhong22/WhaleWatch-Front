import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

// 트랜잭션 타입 정의
interface Transaction {
  id: number;
  coin: string;
  symbol: string;
  price: string;
  amount: string;
  value: string;
  time: string;
  type: 'buy' | 'sell';
}

// 목업 데이터 - 나중에 서버에서 가져오는 데이터로 대체
const mockTransactions: Transaction[] = [
  { id: 1, coin: 'Bitcoin', symbol: 'BTC', price: '$41,235.67', amount: '250 BTC', value: '$10,308,917', time: '10분 전', type: 'buy' },
  { id: 2, coin: 'Ethereum', symbol: 'ETH', price: '$2,837.42', amount: '1,500 ETH', value: '$4,256,130', time: '15분 전', type: 'sell' },
  { id: 3, coin: 'Bitcoin', symbol: 'BTC', price: '$41,237.89', amount: '120 BTC', value: '$4,948,546', time: '20분 전', type: 'buy' },
  { id: 4, coin: 'Solana', symbol: 'SOL', price: '$137.29', amount: '10,000 SOL', value: '$1,372,900', time: '25분 전', type: 'sell' },
  { id: 5, coin: 'Ethereum', symbol: 'ETH', price: '$2,836.18', amount: '800 ETH', value: '$2,268,944', time: '30분 전', type: 'buy' },
  { id: 6, coin: 'XRP', symbol: 'XRP', price: '$0.5437', amount: '5,000,000 XRP', value: '$2,718,500', time: '35분 전', type: 'sell' },
  { id: 7, coin: 'Bitcoin', symbol: 'BTC', price: '$41,240.53', amount: '75 BTC', value: '$3,093,039', time: '40분 전', type: 'buy' },
  { id: 8, coin: 'Cardano', symbol: 'ADA', price: '$0.3845', amount: '3,000,000 ADA', value: '$1,153,500', time: '45분 전', type: 'buy' },
];

const Home = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [latestTransaction, setLatestTransaction] = useState<Transaction | null>(null);

  // 새로운 트랜잭션이 추가되는 효과를 위한 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      const newTx: Transaction = {
        id: Math.random(),
        coin: ['Bitcoin', 'Ethereum', 'Solana', 'XRP', 'Cardano'][Math.floor(Math.random() * 5)],
        symbol: ['BTC', 'ETH', 'SOL', 'XRP', 'ADA'][Math.floor(Math.random() * 5)],
        price: `$${(Math.random() * 50000).toFixed(2)}`,
        amount: `${(Math.random() * 1000).toFixed(0)} ${['BTC', 'ETH', 'SOL', 'XRP', 'ADA'][Math.floor(Math.random() * 5)]}`,
        value: `$${(Math.random() * 10000000).toFixed(0)}`,
        time: '방금 전',
        type: Math.random() > 0.5 ? 'buy' : 'sell'
      };
      
      setLatestTransaction(newTx);
      setTransactions(prev => [newTx, ...prev.slice(0, 7)]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">가상화폐 고래 거래 모니터링</h1>
          <p className="hero-subtitle">실시간으로 대규모 거래를 추적하고 분석하세요</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-value">$128.4B</span>
              <span className="stat-label">최근 24시간 고래 거래량</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">157</span>
              <span className="stat-label">활성 고래 주소</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">2,451</span>
              <span className="stat-label">오늘의 대규모 거래</span>
            </div>
          </div>
        </div>
        <div className="hero-image"></div>
      </div>

      <div className="transaction-section">
        <div className="section-header">
          <h2>실시간 고래 트랜잭션</h2>
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span>실시간</span>
          </div>
        </div>
        
        <div className="transaction-table-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>코인</th>
                <th>가격</th>
                <th>거래량</th>
                <th>거래대금</th>
                <th>시간</th>
                <th>타입</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className={`transaction-row ${tx === latestTransaction ? 'highlight' : ''} ${tx.type === 'buy' ? 'buy' : 'sell'}`}>
                  <td className="coin-cell">
                    <div className="coin-info">
                      <div className="coin-icon"></div>
                      <div>
                        <div className="coin-name">{tx.coin}</div>
                        <div className="coin-symbol">{tx.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td>{tx.price}</td>
                  <td>{tx.amount}</td>
                  <td>{tx.value}</td>
                  <td>{tx.time}</td>
                  <td className={`transaction-type ${tx.type}`}>
                    {tx.type === 'buy' ? '매수' : '매도'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="view-more">
          <button className="view-more-btn">더 많은 거래 보기</button>
        </div>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h3>왜 고래 거래가 중요한가요?</h3>
          <p>고래(대형 투자자)의 거래는 시장에 큰 영향을 미칩니다. 이들의 움직임을 추적하면 시장 동향을 예측하는데 도움이 됩니다.</p>
        </div>
        <div className="info-card">
          <h3>WhaleWatch의 특징</h3>
          <p>텔레그램 알림, 실시간 대시보드, 분석 도구를 통해 고래들의 활동을 쉽게 추적하고 분석할 수 있습니다.</p>
        </div>
        <div className="info-card">
          <h3>시작하기</h3>
          <p>지금 바로 가입하고 알림을 설정하여 중요한 시장 움직임을 놓치지 마세요.</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 