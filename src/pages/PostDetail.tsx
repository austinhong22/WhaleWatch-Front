import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/PostDetail.css';

// 게시글 타입
interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  content: string;
}

// 댓글 타입
interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
}

// 목업 게시글 데이터 (원래는 Community.tsx와 공유하거나 API로 가져올 것입니다)
const mockPosts: Post[] = [
  {
    id: 1,
    title: "비트코인 고래 대규모 이동 감지, 시장에 미치는 영향은?",
    author: "코인마스터",
    date: "2023-10-15",
    views: 1254,
    likes: 42,
    content: "오늘 새벽 약 5,000 BTC(약 2억 달러)가 거래소에서 개인 지갑으로 이동하는 것이 감지되었습니다. 이러한 대규모 이동은 보통 시장에 어떤 영향을 미치는지 토론해보고 싶습니다.\n\n과거 데이터를 보면, 대형 거래소에서 개인 지갑으로의 대규모 이동은 종종 '고래'들이 장기 보유를 위해 코인을 빼는 경우가 많았고, 이는 중장기적으로 가격 상승으로 이어지는 경향이 있었습니다.\n\n또한 이번 이동이 특히 주목할 만한 점은 최근 시장 불확실성이 커지는 상황에서 발생했다는 점입니다. 일부 분석가들은 이것이 기관 투자자들의 '안전 거래'일 수 있다고 보고 있습니다.\n\n여러분들은 이번 고래의 움직임을 어떻게 해석하시나요? 앞으로의 시장에 어떤 영향을 미칠 것 같은지 의견 부탁드립니다."
  },
  {
    id: 2,
    title: "이더리움 고래 지갑 분석 결과 공유합니다",
    author: "ETH분석가",
    date: "2023-10-14",
    views: 876,
    likes: 35,
    content: "지난 30일간 상위 100개 이더리움 지갑의 움직임을 분석했습니다. 흥미로운 패턴이 몇 가지 발견되었는데요, 특히 주목할 만한 것은 대부분의 고래들이 보유량을 꾸준히 늘려가고 있다는 점입니다.\n\n분석 결과 중 주요 사항은 다음과 같습니다:\n\n1. 상위 20개 지갑은 지난 달 대비 평균 15% 보유량 증가\n2. 특히 최근 2주간 누적 구매량이 판매량의 3배 이상\n3. 대형 거래소 지갑에서의 ETH 유출량 증가 추세\n4. 스테이킹 서비스로의 이동이 전체 움직임의 약 40% 차지\n\n이러한 패턴은 대형 투자자들이 장기적으로 이더리움에 긍정적인 전망을 가지고 있음을 시사합니다. 특히 머지(The Merge) 이후 스테이킹에 대한 관심이 크게 증가한 것으로 보입니다.\n\n추가적인 인사이트나 질문 있으시면 댓글로 남겨주세요. 다음 분석에서 다루었으면 하는 주제가 있다면 그것도 알려주시면 감사하겠습니다."
  }
  // 나머지 포스트는 동일한 구조로 포함될 것입니다
];

// 목업 댓글 데이터
const mockComments: { [key: number]: Comment[] } = {
  1: [
    {
      id: 1,
      author: "비트맥스",
      content: "저도 이 움직임을 봤는데요, 흥미로운 점은 이동 직전에 선물 시장에서의 포지션 변화였습니다. 숏 포지션이 급격히 감소했죠.",
      date: "2023-10-15",
      likes: 12
    },
    {
      id: 2,
      author: "블록체인탐정",
      content: "해당 지갑 주소를 추적해보니 과거에도 유사한 패턴이 있었습니다. 주로 큰 시장 움직임 전에 이런 행동을 보였어요.",
      date: "2023-10-15",
      likes: 8
    },
    {
      id: 3,
      author: "뉴비코더",
      content: "고래의 움직임이 항상 시장 지표가 될 수 있을까요? 때로는 개인적인 포트폴리오 조정일 수도 있지 않을까요?",
      date: "2023-10-15",
      likes: 3
    }
  ],
  2: [
    {
      id: 1,
      author: "이더리움홀더",
      content: "정말 유익한 분석 감사합니다. 혹시 이 고래들 중 이전 사이클에서부터 보유해온 장기 투자자의 비율은 어떻게 되나요?",
      date: "2023-10-14",
      likes: 7
    },
    {
      id: 2,
      author: "디파이마스터",
      content: "스테이킹으로의 이동이 많다는 점이 특히 흥미롭네요. 이는 유동성 감소로 이어질 텐데, 가격에 긍정적일 것 같습니다.",
      date: "2023-10-14",
      likes: 5
    }
  ]
};

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  
  // 실제로는 API에서 게시글과 댓글을 가져올 것입니다
  useEffect(() => {
    if (postId) {
      const foundPost = mockPosts.find(p => p.id === parseInt(postId));
      setPost(foundPost || null);
      
      const postComments = mockComments[parseInt(postId)] || [];
      setComments(postComments);
    }
  }, [postId]);
  
  if (!post) {
    return <div className="post-detail-container">게시글을 찾을 수 없습니다.</div>;
  }
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: comments.length + 1,
      author: "현재사용자", // 실제로는 로그인된 사용자 정보를 사용
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };
  
  const toggleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setPost({...post, likes: post.likes + 1});
    } else {
      setPost({...post, likes: post.likes - 1});
    }
  };

  return (
    <div className="post-detail-container">
      <div className="post-navigation">
        <Link to="/community" className="back-link">← 목록으로 돌아가기</Link>
      </div>
      
      <article className="post-content">
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-author">작성자: {post.author}</span>
            <span className="post-date">작성일: {post.date}</span>
            <span className="post-views">조회수: {post.views}</span>
            <span className="post-likes">추천: {post.likes}</span>
          </div>
        </header>
        
        <div className="post-body">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
        
        <div className="post-actions">
          <button 
            className={`like-button ${liked ? 'liked' : ''}`}
            onClick={toggleLike}
          >
            {liked ? '추천됨' : '추천'} ({post.likes})
          </button>
        </div>
      </article>
      
      <section className="comments-section">
        <h3 className="comments-title">댓글 {comments.length}개</h3>
        
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-date">{comment.date}</span>
              </div>
              <div className="comment-body">
                {comment.content}
              </div>
              <div className="comment-actions">
                <button className="comment-like-button">좋아요 {comment.likes}</button>
                <button className="comment-reply-button">답글</button>
              </div>
            </div>
          ))}
        </div>
        
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            className="comment-input"
            placeholder="댓글을 작성하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
          />
          <button type="submit" className="comment-submit">댓글 작성</button>
        </form>
      </section>
    </div>
  );
};

export default PostDetail; 