import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const TopicPage = () => {
  const {id} = useParams();
  const [topic, set_topic] = useState(null);
  const [comments, set_comments] = useState([]);
  const [new_comments, set_new_comments] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.username === "admin";

  useEffect(() => {
    axios.get(`http://localhost:3001/topics/${id}`).then((res) => {
      set_topic(res.data);
    });
    fetch_comm();
  }, [id]);

  const fetch_comm = () => {
    axios.get(`http://localhost:3001/topics/${id}/comments`).then((res) => {
      set_comments(res.data);
    });
  };
  
  const delete_comment = async (commentId) => {
    if (!window.confirm("Ти впевнений, що хочеш видалити цей коментар?")) return;
  
    try {
      await axios.delete(`http://localhost:3001/comments/${commentId}`, {
        data: { user_id: user.id },
      });
      set_comments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Помилка при видаленні коментаря:", error.response?.data || error.message);
      alert("Не вдалося видалити коментар");
    }
  };
  const add_com = async () => {
    if (!new_comments.trim()) return;

    try {
      await axios.post(`http://localhost:3001/topics/${id}/comments`, {
        text: new_comments,
        user_id: user.id,
      });
      set_new_comments("");
      fetch_comm();
    } catch (err) {
      console.error("Помилка при додаванні коментаря:", err);
    }
  };
  const blockUser = async (userIdToBlock) => {
    if (!window.confirm("Заблокувати цього користувача?")) return;
  
    try {
      await axios.post(`http://localhost:3001/users/${userIdToBlock}/block`, {
        admin_id: user.id,
      });
      alert("Користувача заблоковано");
    } catch (error) {
      console.error("Помилка при блокуванні:", error.response?.data || error.message);
      alert("Не вдалося заблокувати користувача");
    }
  };  
  if (!topic) return <p>Завантаження теми...</p>;

  return (
    <div className="topic-page">
      <h2 className="topic-title">{topic.title}</h2>
      <p className="topic-content">{topic.content}</p>

      <h3 className="comments-title">Коментарі</h3>
      {comments.length === 0 ? (
        <p className="comments">Коментарі відсутні.</p>
      ) : (
        comments.map((c, i) => (
          <div key={i} className="comment-box">
            <div className="comment-header">
              <span className="comment-author">{c.username || 'anonym'}</span>
              <span className="comment-date">
                {new Date(c.created_at).toLocaleString()}
              </span>
            </div>
            <p className="comment-text">{c.text}</p>
            {isAdmin && (
                <div className="admin-actions">
                    <button onClick={() => delete_comment(c.id)} className="delete-button">
                        Видалити
                    </button>
                    <button
                        className="block-button"
                        onClick={() => blockUser(c.user_id)}
                    >
                        🚫 Заблокувати {c.username}
                    </button>
                </div>
            )}
          </div>
        ))
      )}

      <div className="add-comment">
        <textarea
          value={new_comments}
          onChange={(e) => set_new_comments(e.target.value)}
          placeholder="Напишіть коментар..."
        />
        <button onClick={add_com}>Додати коментар</button>
      </div>
    </div>
  );
};

export default TopicPage;
