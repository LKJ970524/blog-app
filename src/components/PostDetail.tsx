import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PostProps } from "./PostList";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "firebaseAPP";
import Loader from "./Loader";
import { toast } from "react-toastify";
import Comments from "./Comments";
import { getAuth } from "firebase/auth"; // ✅ 현재 로그인한 사용자 정보 가져오기

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null); // ✅ 현재 로그인한 사용자 저장
  const params = useParams();
  const navigate = useNavigate();
  const auth = getAuth(); // ✅ Firebase 인증 객체 가져오기

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "post", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "post", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
    
    // ✅ 현재 로그인한 유저 정보 가져오기
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser.email); // 이메일을 사용하여 비교
    }
  }, [params?.id, auth.currentUser]);

  return (
    <>
      <div className="post__detail">
        {post ? (
          <>
            <div className="post__box">
              <div className="post__title">{post?.title}</div>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">{post?.email}</div>
                <div className="post__date">{post?.createdAt}</div>
              </div>
              <div className="post__utils-box">
                {post?.category && (
                  <div className="post__category">{post?.category}</div>
                )}

                {/* ✅ 게시글 작성자만 수정/삭제 가능하게 설정 */}
                {currentUser === post?.email && (
                  <>
                    <div
                      className="post__delete"
                      role="presentation"
                      onClick={handleDelete}
                    >
                      삭제
                    </div>
                    <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                      수정
                    </Link>
                  </>
                )}
              </div>
              <div className="post__text post__text--pre-wrap">
                {post?.content}
              </div>
            </div>
            <Comments post={post} getPost={getPost} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
