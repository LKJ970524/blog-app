import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <header>
        <div>
          <Link to="/posts/new">글쓰기</Link>
          <Link to="/posts">게시글</Link>
          <Link to="/profile">profile</Link>
        </div>
      </header>
      <div className="post__navigation">
        <div className="post__navigation--active">전체</div>
        <div>나의 글</div>
      </div>
      <div className="post__list">
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post__box">
            <Link to={`/posts/${index}`}>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">이규정</div>
                <div className="post__date">2024.03.01 금요일</div>
              </div>
              <div className="post__title">게시글 {index}</div>
              <div className="post__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque ac aliquam felis. Phasellus lobortis varius
                malesuada. Phasellus vestibulum mauris ac urna sagittis, eu
                sodales mauris rutrum. Quisque ut imperdiet eros. Maecenas
                imperdiet euismod leo ac rutrum. In in arcu vel libero posuere
                scelerisque. Maecenas non ligula sapien. Maecenas aliquam
                egestas massa, non lacinia est iaculis finibus. Aliquam justo
                sem, congue et porttitor et, commodo sit amet risus. Curabitur
                gravida ultricies efficitur. Sed feugiat nisl nec neque egestas,
                ac gravida sem pretium. Sed ultricies bibendum arcu, et aliquam
                risus condimentum eu. Suspendisse blandit orci vel commodo
                pharetra. Integer in lorem nec ipsum semper tincidunt a sed
                diam. Pellentesque neque metus, consequat at feugiat nec,
                tincidunt at felis.
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <footer>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">profile</Link>
      </footer>
    </div>
  );
}
