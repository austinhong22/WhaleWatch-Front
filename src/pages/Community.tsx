import React from 'react';
import '../styles/Community.css';

const Community = () => {
  return (
    <div className="community-container">
      <h1 className="page-title">커뮤니티</h1>
      
      <div className="posts-container">
        <div className="post-card">
          <div className="post-header">
            <div className="avatar"></div>
            <div className="user-info">
              <p className="username">사용자1</p>
              <p className="post-content">
                오늘 BTC 고래들의 움직임이 심상치 않네요. 다들 어떻게 생각하시나요?
              </p>
            </div>
          </div>
        </div>

        <div className="post-card">
          <div className="post-header">
            <div className="avatar"></div>
            <div className="user-info">
              <p className="username">사용자2</p>
              <p className="post-content">
                ETH 고래들의 지갑 이동이 활발해진 것 같습니다. 큰 움직임이 있을 것 같네요.
              </p>
            </div>
          </div>
        </div>

        <div className="post-form">
          <input type="text" placeholder="메시지를 입력하세요..." className="post-input" />
          <button className="post-button">게시</button>
        </div>
      </div>
    </div>
  );
};

export default Community; 