import {useEffect, useState, useRef} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Forum = () => {
  const [posts, set_post] = useState([]);
  const [new_topic_title, set_new_topic_title] = useState("");
  const [new_topic_desc, set_new_topic_desc] = useState("");
  const [is_create, set_is_create] = useState(false);
  const [user_names, set_user_names] = useState({});
  const [current, set_curr] = useState(1);
  const max = 5;
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user ? user.username : "Unknown user";

  useEffect(() => {
    axios
      .get("http://localhost:3001/topics")
      .then((response) => {
        const sortedPosts = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        set_post(sortedPosts);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error.response?.data || error.message);
      });
  }, []);

  const delete_post = async (postId) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цю тему?")) return;

    try {
      await axios.delete(`http://localhost:3001/topics/${postId}`);
      set_post((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Помилка при видаленні:", err);
      alert("Не вдалося видалити тему.");
    }
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [new_topic_desc]);

  const create_topic = async () => {
    if (!new_topic_title || !new_topic_desc) {
      alert("Будь ласка, заповніть усі поля!");
      return;
    }

    if (!user || !user.id) {
      alert("Ви не авторизовані!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/create_topic", {
        username: username,
        title: new_topic_title,
        description: new_topic_desc,
        user_id: user.id,
      });

      set_new_topic_title("");
      set_new_topic_desc("");
      set_is_create(false);
    } catch (error) {
      console.error("Помилка при створенні теми:", error.response?.data || error.message);
    }
  };

  const last = current * max;
  const first = last - max;
  const current_posts = posts.slice(first, last);

  const changePage = (page) => {
    if (page !== current) {
      set_curr(page);
    }
  };

  const totalPages = Math.ceil(posts.length / max);

  return (
    <div className="forum-container">
      <div className="sidebar">
        {is_create && (
          <div className="create-topic">
            <input
              className="theme_name"
              type="text"
              value={new_topic_title}
              onChange={(e) => set_new_topic_title(e.target.value)}
              placeholder="Назва нової теми"
            />
            <textarea
              ref={textareaRef}
              className="description"
              value={new_topic_desc}
              onChange={(e) => set_new_topic_desc(e.target.value)}
              placeholder="Опис теми"
              rows={1}
              style={{ resize: "none", overflowY: "hidden" }}
            />
            <button className="create" onClick={create_topic}>
              Створити
            </button>
            <button className="return" onClick={() => set_is_create(false)}>
              Скасувати
            </button>
          </div>
        )}
      </div>

      {!is_create && (
        <div>
          <h1>THEMES</h1>

          <div className="forum-box">
            {current_posts.length === 0 ? (
              <p>Немає жодної теми на форумі.</p>
            ) : (
              current_posts.map((post) => (
                <div key={post.id} className="post-item">
                  <div className="post-header">
                    <span className="post-author">
                      {post.author_name || "Unknown Author"}
                    </span>
                    <span className="post-date">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Link to={`/forum/topic/${post.id}`}>
                    <h className="post-title-text">{post.title}</h>
                  </Link>
                  <p>{post.content?.slice(0, 80)}...</p>

                  {(user?.username === post.username || user?.username === "admin") && (
                    <button
                      className="delete-post-button"
                      onClick={() => delete_post(post.id)}
                    >
                      🗑️ Видалити тему
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => changePage(index + 1)}
                className={`page-button ${current === index + 1 ? "active" : ""}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="create-post-container">
            <button className="button-post-create" onClick={() => set_is_create(true)}>
              Створити нову тему
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;