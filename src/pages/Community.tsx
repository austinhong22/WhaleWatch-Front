import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Community.css';

// 게시글 타입 정의
interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  content: string;
}

// 코인 타입 정의
interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

// 목업 데이터
const mockPosts: Post[] = [
  {
    id: 1,
    title: "비트코인 고래 대규모 이동 감지, 시장에 미치는 영향은?",
    author: "코인마스터",
    date: "2023-10-15",
    views: 1254,
    likes: 42,
    content: "오늘 새벽 약 5,000 BTC(약 2억 달러)가 거래소에서 개인 지갑으로 이동하는 것이 감지되었습니다. 이러한 대규모 이동은 보통 시장에 어떤 영향을 미치는지 토론해보고 싶습니다. 과거 데이터를 보면..."
  },
  {
    id: 2,
    title: "이더리움 고래 지갑 분석 결과 공유합니다",
    author: "ETH분석가",
    date: "2023-10-14",
    views: 876,
    likes: 35,
    content: "지난 30일간 상위 100개 이더리움 지갑의 움직임을 분석했습니다. 흥미로운 패턴이 몇 가지 발견되었는데요, 특히 주목할 만한 것은 대부분의 고래들이 보유량을 꾸준히 늘려가고 있다는 점입니다..."
  },
  {
    id: 3,
    title: "솔라나 고래의 움직임에 따른 가격 변동 상관관계",
    author: "솔라나러버",
    date: "2023-10-13",
    views: 543,
    likes: 21,
    content: "솔라나의 경우 고래의 움직임과 가격 변동 사이에 어떤 상관관계가 있는지 연구해봤습니다. 제가 수집한 데이터에 따르면, 대형 지갑에서의 매수세가 강해질 때 평균적으로 48시간 이내에 가격이 상승하는 경향이..."
  },
  {
    id: 4,
    title: "XRP 고래들의 최근 행보, 무엇을 의미하는가",
    author: "리플워치",
    date: "2023-10-12",
    views: 789,
    likes: 28,
    content: "최근 몇 주간 XRP 고래들의 움직임이 특이하게 관찰되고 있습니다. 특히 상위 10개 지갑에서 다수의 XRP가 유출되어 중소형 지갑으로 분산되는 현상이 포착되었습니다. 이것은 앞으로의 시장에 어떤 의미를..."
  },
  {
    id: 5,
    title: "카르다노 고래들의 지갑 분석 및 시장 전망",
    author: "ADA연구소",
    date: "2023-10-11",
    views: 621,
    likes: 19,
    content: "카르다노 생태계의 고래 지갑을 분석한 결과를 공유합니다. 현재 대형 투자자들의 카르다노 보유 패턴을 분석해보면, 장기 투자 성향이 강하게 나타나고 있으며 이는 앞으로의 가격 안정에 기여할 것으로..."
  },
  {
    id: 6,
    title: "고래 지갑 추적을 위한 효과적인 도구 추천",
    author: "블록체인탐정",
    date: "2023-10-10",
    views: 932,
    likes: 53,
    content: "고래 지갑을 효과적으로 추적하기 위한 다양한 툴을 사용해봤는데요, 개인적으로 가장 유용했던 것들을 공유합니다. 1. WhaleAlert - 실시간 알림 기능이 유용합니다. 2. Glassnode - 온체인 데이터 분석에 탁월..."
  },
  {
    id: 7,
    title: "초보자를 위한 고래 거래 추적 방법",
    author: "코인초보",
    date: "2023-10-09",
    views: 1542,
    likes: 87,
    content: "암호화폐 시장에 갓 입문한 분들을 위해 고래의 움직임을 추적하는 기본적인 방법을 알려드립니다. 먼저 블록체인 익스플로러의 사용법부터 시작해서, 주요 고래 지갑 주소 확인 방법, 그리고 이를 통한 시장 분석까지..."
  },
  {
    id: 8,
    title: "고래 행동 패턴 분석: 2023년 3분기 보고서",
    author: "데이터사이언티스트",
    date: "2023-10-08",
    views: 876,
    likes: 41,
    content: "2023년 3분기 동안의 주요 코인별 고래 행동 패턴을 분석했습니다. 특히 BTC, ETH, BNB의 상위 지갑들에서 발견된 주기적 패턴과 시장 반응 간의 상관관계를 중점적으로 살펴봤는데요, 흥미로운 점은..."
  },
  {
    id: 9,
    title: "고래 움직임으로 예측한 다음 알트코인 시즌",
    author: "알트코인헌터",
    date: "2023-10-07",
    views: 1203,
    likes: 65,
    content: "비트코인 대형 투자자들의 최근 포트폴리오 변화를 분석해본 결과, 많은 고래들이 알트코인으로 자금을 분산하는 추세가 관찰되고 있습니다. 이는 곧 알트코인 시즌이 다가오고 있음을 시사하는데..."
  },
  {
    id: 10,
    title: "고래 거래 사례로 배우는 투자 전략",
    author: "투자의신",
    date: "2023-10-06",
    views: 954,
    likes: 49,
    content: "성공적인 고래 투자자들의 거래 패턴을 분석하여 일반 투자자들이 응용할 수 있는 전략을 정리했습니다. 물론 그들과 같은 자금력은 없지만, 타이밍과 분산 투자 방식 등은 충분히 배울 점이 많습니다..."
  }
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // 코인 데이터 불러오기
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
        );
        
        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다');
        }
        
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError('데이터를 불러오는 데 실패했습니다');
        setLoading(false);
        console.error('코인 데이터 로딩 오류:', error);
      }
    };

    fetchCoins();
    
    // 1분마다 데이터 갱신
    const interval = setInterval(fetchCoins, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="community-container">
      <div className="community-header">
        <h1 className="page-title">커뮤니티</h1>
        <p className="page-subtitle">고래 거래와 시장 동향에 대해 다른 사용자들과 의견을 나눠보세요.</p>
      </div>
      
      {/* 실시간 코인 가격 섹션 */}
      <div className="coin-ticker-section">
        <div className="ticker-header">
          <h2 className="ticker-title">실시간 시세</h2>
          <div className="ticker-update">
            <span className="update-dot"></span>
            <span>실시간 업데이트</span>
          </div>
        </div>
        
        {loading ? (
          <div className="ticker-loading">데이터를 불러오는 중...</div>
        ) : error ? (
          <div className="ticker-error">{error}</div>
        ) : (
          <div className="coin-ticker-container">
            {coins.map((coin) => (
              <div key={coin.id} className="coin-card">
                <div className="coin-info">
                  <img src={coin.image} alt={coin.name} className="coin-icon" />
                  <div className="coin-name-container">
                    <span className="coin-name">{coin.name}</span>
                    <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                  </div>
                </div>
                <div className="coin-price-container">
                  <span className="coin-price">${coin.current_price.toLocaleString()}</span>
                  <span className={`coin-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                    {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'} 
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="board-controls">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="제목이나 작성자로 검색..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">검색</button>
        </div>
        <button className="new-post-button">글쓰기</button>
      </div>
      
      <div className="board-container">
        <table className="board-table">
          <thead>
            <tr>
              <th className="no-column">No.</th>
              <th className="title-column">제목</th>
              <th className="author-column">작성자</th>
              <th className="date-column">등록일</th>
              <th className="views-column">조회수</th>
              <th className="likes-column">추천</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id} className="board-row">
                <td className="no-cell">{post.id}</td>
                <td className="title-cell">
                  <Link to={`/community/${post.id}`} className="post-title-link">
                    {post.title}
                  </Link>
                </td>
                <td className="author-cell">{post.author}</td>
                <td className="date-cell">{post.date}</td>
                <td className="views-cell">{post.views}</td>
                <td className="likes-cell">{post.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <button className="pagination-button">이전</button>
        <div className="page-numbers">
          <button className="page-number active">1</button>
          <button className="page-number">2</button>
          <button className="page-number">3</button>
          <span>...</span>
          <button className="page-number">10</button>
        </div>
        <button className="pagination-button">다음</button>
      </div>
    </div>
  );
};

export default Community; 